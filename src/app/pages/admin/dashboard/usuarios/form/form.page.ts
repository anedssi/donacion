/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../../../../auth/authentication.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

export class User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  admin: boolean;
}

export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {

  userfoms: any;
  message: string;
  id= '';
  em ='';
  uelphoto = '';
  displayname ='';
  user: any;
  // File upload task
  fileUploadTask: AngularFireUploadTask;
  // Upload progress
  percentageVal: Observable<number>;
  // Track file uploading with snapshot
  trackSnapshot: Observable<any>;
  // Uploaded File URL
  UploadedImageURL: Observable<string>;
  // Uploaded image collection
  files: Observable<imgFile[]>;
  // Image specifications
  imgName: string;
  imgSize: number;
  // File uploading status
  isFileUploading: boolean;
  isFileUploaded: boolean;
  private filesCollection: AngularFirestoreCollection<imgFile>;
  constructor(public authScv: AuthenticationService,
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private router: Router,
    private activedrouter: ActivatedRoute
  ) {
    this.isFileUploading = false;
    this.isFileUploaded = false;
    // Define uploaded files collection
    this.filesCollection = afs.collection<imgFile>('imagesCollection');
    this.files = this.filesCollection.valueChanges();
  }

  ngOnInit() {
    const params = this.activedrouter.snapshot.params;
    this.id = params.id;
    this.userForm();
    this.em = this.authScv.useremail;
    this.authScv.getuserid(this.id).subscribe((data) => {
      this.user = data;
      console.log(this.user.photoURL);
      if(this.user.photoURL){
        this.uelphoto = this.user.photoURL;
      }else{
        this.uelphoto = 'https://firebasestorage.googleapis.com/v0/b/donaciones-35dfe.appspot.com/o/users%2Fno-image-icon-23485%20(1).png?alt=media&token=6a628c47-4924-4dc2-ad70-68b614a3a9e4';
      }
      this.userfoms.patchValue({
        email:  this.user.email,
        uid:  this.user.uid,
        displayName: this.user.displayName,
        photoURL:  this.user.photoURL,
        emailVerified: this.user. emailVerified,
        admin: this.user.admin,
      },
      (err)=>{
        this.userfoms.patchValue({
          email: this.em,
          uid: this.id,
          photoURL: this.uelphoto,
          emailVerified: true,
          admin: false,
        });
      });
    });
  }

  userForm(): void{
    this.userfoms = this.fb.group({
      uid: ['',[Validators.required]],
      email: ['',[Validators.required]],
      displayName: ['',[Validators.required,Validators.minLength(4)]],
      photoURL: ['',[Validators.required,Validators.minLength(4)]],
      emailVerified: ['',[Validators.required,Validators.minLength(4)]],
      admin: ['',[Validators.required,Validators.minLength(4)]],
    });
  }
  isvalid(field: string): boolean {
    this.getErrorMessage(field);
    return (this.userfoms.get(field).invalid && (this.userfoms.get(field).dirty || this.userfoms.get(field).touched));
  }


  private getErrorMessage(field: string): void {
    const  { errors }   = this.userfoms.get(field);
      if (errors) {
        const messages: any = {
          required: 'el campo es requerido',
          minlength: `el valor ingesado es menor a 4 carateres`,
        };
      const errorkey = Object.keys(errors).find(Boolean);
      this.message = messages[errorkey|| ''];
      }
  }
  async newImagen(event: FileList) {
    const file = event.item(0);
    // Image validation
    if (file.type.split('/')[0] !== 'image') {
      console.log('File type is not supported!');
      return;
    }
    this.isFileUploading = true;
    this.isFileUploaded = false;
    this.imgName = file.name;
    // Storage path
    const fileStoragePath = `users/${new Date().getTime()}_${file.name}`;
    // Image reference
    const imageRef = this.afStorage.ref(fileStoragePath);
    // File upload task
    this.fileUploadTask = this.afStorage.upload(fileStoragePath, file);
    // Show uploading progress
    this.percentageVal = this.fileUploadTask.percentageChanges();
    this.trackSnapshot = this.fileUploadTask.snapshotChanges().pipe(
      finalize(() => {
        // Retreive uploaded image storage path
        this.UploadedImageURL = imageRef.getDownloadURL();
        this.UploadedImageURL.subscribe(
          (resp) => {
            this.uelphoto = resp;
            this.userfoms.patchValue({
              photoURL: this.uelphoto,
            });
            this.storeFilesFirebase({
              name: file.name,
              filepath: resp,
              size: this.imgSize,
            });
            this.isFileUploading = false;
            this.isFileUploaded = true;
          },
          (error) => {
            console.log(error);
          }
        );
      }),
      tap((snap) => {
        this.imgSize = snap.totalBytes;
      })
    );
  }
  storeFilesFirebase(image: imgFile) {
    const fileId = this.afs.createId();
    this.filesCollection
      .doc(fileId)
      .set(image)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  create(): void{
    if(this.user){
      this.authScv.updateuser(this.id,this.userfoms.value)
    .then(() => {
      this.userfoms.reset();
      this.router.navigate(['/dashboard/usuarios']);
    }).catch((err) => {
      console.log(err);
    });
    }else{
      this.authScv.createuser(this.userfoms.value)
    .then(() => {
      this.userfoms.reset();
      this.router.navigate(['/dashboard/usuarios']);
    }).catch((err) => {
      console.log(err);
    });
    }
  }

}

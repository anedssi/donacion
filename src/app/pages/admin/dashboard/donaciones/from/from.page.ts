/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { DonacionService } from "./../../../../services/donacion.service";
import { ActionSheetController } from '@ionic/angular';
import { AuthenticationService } from './../../../../auth/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}
enum Action {
  EDIT = 'EDIT',
  NEW = 'NEW',
}

export class Donacion {
  $key: string;
  tipodonacion: string;
  date: Date;
  photoURL: string;
  entrega: string;
  direccion: string;
  isfavorite: boolean;
  detalle: string;
  estadoentrega: string;
  uid: string;
}
export class TipoDonacion {
  $key: string;
  tipo: string;
}
export class Lugar {
  $key: string;
  entrega: string;
}

@Component({
  selector: 'app-from',
  templateUrl: './from.page.html',
  styleUrls: ['./from.page.scss'],
})
export class FromPage implements OnInit {

  actionTODO = Action.NEW;
  name: string;
  doancionfoms: any;
  message='';
  id= '';
  urlphoto = '';
  tipodonacion: any[]=[];
  lugar: any[]= [];
  alberge: any;
  donacion: any;
  donacions: any[]=[];
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
  uid: any;
  // File uploading status
  isFileUploading: boolean;
  isFileUploaded: boolean;
  private filesCollection: AngularFirestoreCollection<imgFile>;
  constructor(
    private fb: FormBuilder,
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private donacionSvc: DonacionService,
    public actionSheetController: ActionSheetController,
    private authSvc: AuthenticationService,
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
    this.doancionForm();
    this.list();
    this.urlphoto = 'https://firebasestorage.googleapis.com/v0/b/donaciones-35dfe.appspot.com/o/users%2Fno-image-icon-23485%20(1).png?alt=media&token=6a628c47-4924-4dc2-ad70-68b614a3a9e4';
    const params = this.activedrouter.snapshot.params;
    if(params.id){
      this.actionTODO = Action.EDIT;
      this.id = params.id;
      this.donacionSvc.getdonacion(this.id).subscribe((data) => {
      this.donacion = data;
      this.urlphoto = this.donacion.photoURL;
      this.doancionfoms.patchValue({
        tipodonacion:  this.donacion.tipodonacion,
        date:  this.donacion.date,
        photoURL:  this.donacion.photoURL,
        entrega: this.donacion.entrega,
        direccion: this.donacion.direccion,
        isfavorite:  this.donacion.isfavorite,
        detalle: this.donacion.detalle,
        estadoentrega: this.donacion.estadoentrega,
        uid: this.donacion.uid,
      });
    });
    }else{
      this.actionTODO = Action.NEW;
    }
  }

  list(): void {
    this.donacionSvc.getTdonaciontipo().subscribe((res) => {
      this.tipodonacion = res.map((t) => {
        return {
          id: t.payload.doc.id,
          ...t.payload.doc.data() as TipoDonacion
        };
      });
    });
    this.donacionSvc.getTlugar().subscribe((res) => {
      this.lugar = res.map((t) => {
        return {
          id: t.payload.doc.id,
          ...t.payload.doc.data() as Lugar
        };
      });
    });
  }

  doancionForm(): void{
    this.doancionfoms = this.fb.group({
      tipodonacion:  ['',[Validators.required, Validators.minLength(2)]],
      date:  ['',[Validators.required, Validators.minLength(8)]],
      photoURL:  ['',[Validators.required, Validators.minLength(8)]],
      entrega: ['',[Validators.required, Validators.minLength(8)]],
      direccion: ['',[Validators.required, Validators.minLength(8)]],
      isfavorite:  [false],
      detalle: ['',[Validators.required, Validators.minLength(8)]],
      estadoentrega: ['En proceso'],
      uid:[this.authSvc.userid],
    });
  }

  isvalid(field: string): boolean {
    this.getErrorMessage(field);
    return (this.doancionfoms.get(field).invalid && (this.doancionfoms.get(field).dirty || this.doancionfoms.get(field).touched));
  }


  private getErrorMessage(field: string): void {
    const  { errors }   = this.doancionfoms.get(field);
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
    const fileStoragePath = `donacion/${new Date().getTime()}_${file.name}`;
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
            this.urlphoto = resp;
            this.doancionfoms.patchValue({
              photoURL: this.urlphoto,
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

  edit(id): void{
    this.id = id;
    this.donacionSvc.getdonacion(this.id).subscribe((data) => {
      this.donacion = data;
      this.urlphoto = this.donacion.photoURL;
      this.doancionfoms.patchValue({
        tipodonacion:  this.donacion.tipodonacion,
        date:  this.donacion.date,
        photoURL:  this.donacion.photoURL,
        entrega: this.donacion.entrega,
        direccion: this.donacion.direccion,
        isfavorite:  this.donacion.isfavorite,
        detalle: this.donacion.detalle,
        uid: this.donacion.uid,
      });
    });
    if(this.donacion){
      console.log('edit');
    }else{
      console.log('new');
    }
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log('hola');
    }
  }
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  save(): void{
    if(this.actionTODO === Action.EDIT){
      this.donacionSvc.update(this.id,this.doancionfoms.value)
      .then(() => {
        this.doancionfoms.reset();
        this.urlphoto = 'https://firebasestorage.googleapis.com/v0/b/donaciones-35dfe.appspot.com/o/users%2Fno-image-icon-23485%20(1).png?alt=media&token=6a628c47-4924-4dc2-ad70-68b614a3a9e4';
        this.percentageVal = null;
        this.trackSnapshot = null;
        this.id = '';
        this.doancionfoms.patchValue({
          uid: this.authSvc.userid,
        });
        this.router.navigate(['/dashboard/donaciones']);
      }).catch((err) => {
        console.log(err);
      });
      this.doancionfoms.reset();
      this.donacion = null;
    }else{
      console.log('new');
      this.donacionSvc.create(this.doancionfoms.value)
      .then(() => {
        this.doancionfoms.reset();
        this.urlphoto = 'https://firebasestorage.googleapis.com/v0/b/donaciones-35dfe.appspot.com/o/users%2Fno-image-icon-23485%20(1).png?alt=media&token=6a628c47-4924-4dc2-ad70-68b614a3a9e4';
        this.percentageVal = null;
        this.trackSnapshot = null;
        this.doancionfoms.patchValue({
          uid: this.authSvc.userid,
        });
        this.router.navigate(['/dashboard/donaciones']);
      }).catch((err) => {
        console.log(err);
      });
      this.doancionfoms.reset();
      this.donacion = null;
    }
  }
}

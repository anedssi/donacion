/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, NgZone } from '@angular/core';
import * as auth from 'firebase/auth';
import { UserSignIn, User } from './../shared/model/user.interfaces';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { onAuthStateChanged } from 'firebase/auth';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  usersRef: AngularFireList<any>;
  userRef: AngularFireObject<any>;
  userData: any;
  constructor(
    public afStore: AngularFirestore,
    public fileStorage: AngularFireStorage,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private db: AngularFireDatabase
  ) {
    this.ngFireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }
  //login
  login(userlogin: UserSignIn): any{
    return this.ngFireAuth.signInWithEmailAndPassword(userlogin.email, userlogin.password);
  }
  //registrar
  registreUser(usersignin: UserSignIn): any{
    return this.ngFireAuth.createUserWithEmailAndPassword(usersignin.email, usersignin.password);
  }
  // Enviar Email de Verificación
  SendVerificationMail(): any{
    return this.ngFireAuth.currentUser.then((res)=>res.sendEmailVerification().then(()=>{
        this.router.navigate(['/verify-email']);
      }));
  }
  //Verificacion de email
  get isEmailVerified(): boolean{
    const user = JSON.parse(localStorage.getItem('user'));
    return user.emailVerified !== false ? true : false;
  }

  //is esta logeado
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    onAuthStateChanged(auth.getAuth(), (user) => {
      if (user) {
        console.log(user);
        const uid = user.uid;
      } else {

      }
    });
    return user !== null && user.emailVerified !== false ? true : false;
}
  // auth providers
  async Authlogin(provider){
    try{
      const result = await this.ngFireAuth.signInWithPopup(provider);
      this.ngZone.run(()=>{
        //this.router.navigate(['/']);
      });
      this.SetUserData(result.user);
    } catch (error) {
      console.error(error);
    }
  }

  //user in localstores
  SetUserData(user): Promise<void>{
    const userRef: AngularFirestoreDocument<any> = this.afStore.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
      admin: false
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  //google auth
  GoogleAuth() {
    return this.Authlogin(new auth.GoogleAuthProvider());
  }

  async SignOut() {
    await this.ngFireAuth.signOut();
    localStorage.removeItem('user');
    this.router.navigate(['login']);
  }

  get userid(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.uid;
  }

  get useremail(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.email;
  }
  get userphoto(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.photoURL;
  }
  get username(): string {
    const user = JSON.parse(localStorage.getItem('user'));
    return user.displayName;
  }

  createuser( user: User){
    user.uid = this.userid;
    const colletion = this.afStore.collection('users');
    return colletion.doc(user.uid).set(user);
  }

  getuser() {
    return this.afStore.collection('users').snapshotChanges();
  }

  getuserid(id) {
    return this.afStore.collection('users').doc(id).valueChanges();
  }

  updateuser(id, todo: User) {
    return this.afStore.collection('users').doc(id).update(todo);
  }

  delete(id: string) {
    this.afStore.doc('tasks/' + id).delete();
  }

  uplodadimg(file: any, path: string, nombre: string): Promise<string>{
    return new Promise(resolve=>{
      const filePath = path+'/'+ nombre;
      const ref = this.fileStorage.ref(filePath);
      const task = this.fileStorage.upload(filePath,file);
      console.log(task.percentageChanges());
      resolve('este la respuesta');
    });
  }
}

import { query } from 'firebase/firestore';
/* eslint-disable @typescript-eslint/adjacent-overload-signatures */
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, Query } from '@angular/fire/compat/firestore';

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

@Injectable({
  providedIn: 'root'
})
export class DonacionService {
  private filesCollection: AngularFirestoreCollection<Donacion>;
  constructor(
    private ngFirestore: AngularFirestore,
  ) { }

  create(todo: Donacion) {
    return this.ngFirestore.collection('donacion').add(todo);
  }

  getTdonacion() {
    return this.ngFirestore.collection('donacion').snapshotChanges();
  }

  getdonacion(id) {
    return this.ngFirestore.collection('donacion').doc(id).valueChanges();
  }

  update(id, todo: TipoDonacion) {
    return this.ngFirestore.collection('donacion').doc(id).update(todo);
  }

  delete(id: string) {
    this.ngFirestore.doc('donacion/' + id).delete();
  }
  createtipo(todo: TipoDonacion) {
    return this.ngFirestore.collection('tipodonacion').add(todo);
  }

  getTdonaciontipo() {
    return this.ngFirestore.collection('tipodonacion').snapshotChanges();
  }

  getdonaciontipo(id) {
    return this.ngFirestore.collection('tipodonacion').doc(id).valueChanges();
  }

  updatetipo(id, todo: Donacion) {
    return this.ngFirestore.collection('tipodonacion').doc(id).update(todo);
  }

  deletetipo(id: string) {
    this.ngFirestore.doc('tipodonacion/' + id).delete();
  }
  createlugar(todo: TipoDonacion) {
    return this.ngFirestore.collection('alberge').add(todo);
  }

  getTlugar() {
    return this.ngFirestore.collection('alberge').snapshotChanges();
  }

  getlugar(id) {
    return this.ngFirestore.collection('alberge').doc(id).valueChanges();
  }

  updatelugar(id, todo: Donacion) {
    return this.ngFirestore.collection('alberge').doc(id).update(todo);
  }

  deletelugar(id: string) {
    this.ngFirestore.doc('alberge/' + id).delete();
  }
}

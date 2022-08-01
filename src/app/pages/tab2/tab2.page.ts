/* eslint-disable arrow-body-style */
import { Component, OnInit } from '@angular/core';
import { DonacionService } from '../services/donacion.service';
import { AuthenticationService } from './../auth/authentication.service';

export class Donacion {
  $key: string;
  tipodonacion: string;
  date: Date;
  photoURL: string;
  entrega: string;
  direccion: string;
  isfavorite: boolean;
  detalle: string;
  uid: string;
}
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit {

  donacions: any[]=[];
  filtre: any[]=[];
  constructor(
    private donacionSvc: DonacionService,
    private authSvc: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.donacionSvc.getTdonacion().subscribe((res) => {
      const result = res.map((t) => {
        return {
          id: t.payload.doc.id,
          ...t.payload.doc.data() as Donacion
        };
      });
      this.donacions= result.filter(don => don.uid === this.authSvc.userid);
      this.filtre = this.donacions.filter(don => don.isfavorite === true);
    });
  }
}

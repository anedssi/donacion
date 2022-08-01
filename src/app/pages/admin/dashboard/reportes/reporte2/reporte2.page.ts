/* eslint-disable arrow-body-style */
import { Component, OnInit } from '@angular/core';
import { DonacionService } from './../../../../services/donacion.service';

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
@Component({
  selector: 'app-reporte2',
  templateUrl: './reporte2.page.html',
  styleUrls: ['./reporte2.page.scss'],
})

export class Reporte2Page implements OnInit {

  estado: any;
  donacions: any[]=[];
  dis: any[] = [];
  constructor(
    private donacionSvc: DonacionService
  ) { }

  ngOnInit() {
    this.list();
  }
  list(): void{
    this.donacionSvc.getTdonacion().subscribe((res) => {
      this.donacions = res.map((t) => {
        return {
          id: t.payload.doc.id,
          ...t.payload.doc.data() as Donacion
        };
      });
      this.dis =this.donacions;
      this.dis = this.donacions.filter(acc => acc.estadoentrega === this.estado );
    });
  }
  event(event){
    this.estado = event.detail.value;
    this.list();
  }
}

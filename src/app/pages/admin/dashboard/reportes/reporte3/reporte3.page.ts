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

export class Lugar {
  $key: string;
  entrega: string;
}

@Component({
  selector: 'app-reporte3',
  templateUrl: './reporte3.page.html',
  styleUrls: ['./reporte3.page.scss'],
})
export class Reporte3Page implements OnInit {

  entrega: any;
  donacions: any[]=[];
  dis: any[] = [];
  lugar: any[]= [];
  constructor(
    private donacionSvc: DonacionService
  ) { }

  ngOnInit() {
    this.list();
  }
  list(): void{
    this.donacionSvc.getTlugar().subscribe((res) => {
      this.lugar = res.map((t) => {
        return {
          id: t.payload.doc.id,
          ...t.payload.doc.data() as Lugar
        };
      });
    });
    this.donacionSvc.getTdonacion().subscribe((res) => {
      this.donacions = res.map((t) => {
        return {
          id: t.payload.doc.id,
          ...t.payload.doc.data() as Donacion
        };
      });
      this.dis =this.donacions;
      this.dis = this.donacions.filter(acc => acc.direccion.indexOf(this.entrega));
      console.log(this.dis);
    });
  }
  event(event){
    console.log(this.entrega);
    this.list();
  }

}

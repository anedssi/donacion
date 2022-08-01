/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable prefer-const */
import { DonacionService } from './../../../../services/donacion.service';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

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
  selector: 'app-reporte1',
  templateUrl: './reporte1.page.html',
  styleUrls: ['./reporte1.page.scss'],
})
export class Reporte1Page implements OnInit {
  dis: any[] = [];
  preDate: any;
  postDate: any;
  donacions: any[]=[];
  constructor(
    private donacionSvc: DonacionService,
    private alertController: AlertController
  ) { }


  list(): void{
    this.donacionSvc.getTdonacion().subscribe((res) => {
      this.donacions = res.map((t) => {
        return {
          id: t.payload.doc.id,
          ...t.payload.doc.data() as Donacion
        };
      });
      this.dis =this.donacions;
      let preDate = this.toMs(this.preDate);
      let postDate = this.toMs(this.postDate);
      this.dis = this.donacions.filter(acc => this.toMs(acc.date) > preDate && this.toMs(acc.date) < postDate );
    });
  }

  ngOnInit() {
    this.list();
  }

  toMs(dateStr){
    let parts = dateStr.split("-");
    console.log(parts[2], parts[1], parts[0]);
    return new Date(parts[2], parts[1] - 1, parts[0]).getTime();
  }

  event(event){
    console.log(this.preDate);
    console.log(this.postDate);
    this.list();
  }
}

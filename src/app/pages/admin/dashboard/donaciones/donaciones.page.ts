/* eslint-disable arrow-body-style */
import { DonacionService } from './../../../services/donacion.service';
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
  selector: 'app-donaciones',
  templateUrl: './donaciones.page.html',
  styleUrls: ['./donaciones.page.scss'],
})
export class DonacionesPage implements OnInit {

  donacions: any[]=[];
  constructor(
    private donacionSvc: DonacionService,
    private alertController: AlertController
  ) { }

  async presentAlert(id) {
    const alert = await this.alertController.create({
      header: 'Desea Eliminar el Registro',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => { }
        },
        {
          text: 'OK',
          role: 'confirm',
          handler: () => {
            this.delete(id);
           }
        }
      ]
    });

    await alert.present();
  }

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
    });
  }

  delete(id: any): void{
    this.donacionSvc.delete(id);
    this.list();
  }
}

/* eslint-disable arrow-body-style */
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DonacionService } from './../../../services/donacion.service';

export class TipoDonacion {
  $key: string;
  tipo: string;
}

@Component({
  selector: 'app-tipodonacion',
  templateUrl: './tipodonacion.page.html',
  styleUrls: ['./tipodonacion.page.scss'],
})
export class TipodonacionPage implements OnInit {

  tipodonacion: any[]=[];
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
    this.donacionSvc.getTdonaciontipo().subscribe((res) => {
      this.tipodonacion = res.map((t) => {
        return {
          id: t.payload.doc.id,
          ...t.payload.doc.data() as TipoDonacion
        };
      });
    });
  }

  delete(id: any): void{
    this.donacionSvc.deletetipo(id);
    this.list();
  }


}

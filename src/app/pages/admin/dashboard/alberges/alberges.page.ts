/* eslint-disable arrow-body-style */
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { DonacionService } from './../../../services/donacion.service';

export class Lugar {
  $key: string;
  entrega: string;
}

@Component({
  selector: 'app-alberges',
  templateUrl: './alberges.page.html',
  styleUrls: ['./alberges.page.scss'],
})
export class AlbergesPage implements OnInit {
  
  lugares: any[]=[];
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
    this.donacionSvc.getTlugar().subscribe((res) => {
      this.lugares = res.map((t) => {
        return {
          id: t.payload.doc.id,
          ...t.payload.doc.data() as Lugar
        };
      });
    });
  }

  delete(id: any): void{
    this.donacionSvc.deletelugar(id);
    this.list();
  }

}

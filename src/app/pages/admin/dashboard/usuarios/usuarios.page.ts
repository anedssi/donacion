/* eslint-disable arrow-body-style */
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AuthenticationService } from './../../../auth/authentication.service';

export class User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  admin: boolean;
}

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  user: any[] = [];
  constructor(
    private authSvc: AuthenticationService,
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
    this.authSvc.getuser().subscribe((res) => {
      this.user = res.map((t) => {
        return {
          id: t.payload.doc.id,
          ...t.payload.doc.data() as User
        };
      });
    });
  }

  delete(id: any): void{
    this.authSvc.delete(id);
    this.list();
  }


}

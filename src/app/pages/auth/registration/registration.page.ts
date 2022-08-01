/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './../authentication.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  registreform: any;
  private isValidEmail = /\S+@\S+\.\S+/;
  mensajes: string;

  constructor(
    public authScv: AuthenticationService,
    public router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.registreForm();

  }

  signUp(): void{
    const registre = this.registreform.value;
    this.authScv.registreUser(registre).then((res)=>{
      //console.log('registre');
      this.authScv.SendVerificationMail();
      //this.router.navigate(['/verify-email']);
    }).catch((err)=>{
      window.alert(err.message);
    });
  }

  registreForm(): void{
    this.registreform = this.fb.group({
      email:['',[Validators.required, Validators.pattern(this.isValidEmail)]],
      password:['',[Validators.required, Validators.minLength(6)]],
    });
  }

  isValid(field: string): boolean {
    this.getErrorMessage(field);
    return (this.registreform.get(field).invalid && (this.registreform.get(field).dirty || this.registreform.get(field).touched));
  }


  private getErrorMessage(field: string): void {
    const  { errors }   = this.registreform.get(field);
    if (errors) {
      const minlenght = errors?.minlength?.requiredLength;
      const messages: any = {
        required: 'Este campo es requerido.',
        pattern: 'No es un correo válido.',
        minlength: `Debe tener al menos ${minlenght} caracteres`,
      };
    const errorkey = Object.keys(errors).find(Boolean);
    this.mensajes = messages[errorkey|| ''];
    }
  }
}

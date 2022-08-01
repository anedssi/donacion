/* eslint-disable @typescript-eslint/member-ordering */
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../authentication.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginform: any;
  private isValidEmail = /\S+@\S+\.\S+/;
  mensajes: string;
  constructor(
    private authScv: AuthenticationService,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loginForm();
  }
  logIn(){
    const lg = this.loginform.value;
    this.authScv.login(lg).then((res)=>{
      if(this.authScv.isEmailVerified){
        this.router.navigate(['/donacion/tabs/tab1']);
      } else {
        window.alert('Email is not Verified');
        return false;
      }
    }).catch((err)=>{
      console.error(err.message);
    });
  }
  loginForm(): void{
    this.loginform = this.fb.group({
      email:['',[Validators.required, Validators.pattern(this.isValidEmail)]],
      password:['',[Validators.required, Validators.minLength(6)]],
    });
  }

  isValid(field: string): boolean {
    this.getErrorMessage(field);
    return (this.loginform.get(field).invalid && (this.loginform.get(field).dirty || this.loginform.get(field).touched));
  }


  private getErrorMessage(field: string): void {
    const  { errors }   = this.loginform.get(field);
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

/* eslint-disable prefer-const */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/quotes */
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../authentication.service';
import { timer } from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  _second = 1000;
  _minute = this._second * 60;
  _hour = this._minute * 60;
  _day = this._hour * 24;
  end: any;
  now: any;
  day: any;
  hours: any;
  minutes: any;
  seconds: any;
  source = timer(0, 1000);
  clock: any;
  isartive = false;
  constructor(
    public authScv: AuthenticationService,
    public router: Router
  ) { }

  ngOnInit() {
    let cuenta = 15;
    this.clock = this.source.subscribe(t => {
      this.now = new Date();
      this.end = new Date('01/01/' + (this.now.getFullYear() + 1) +' 00:00');
      let cronometro = Math.floor(((this.end - this.now) % this._minute) / this._second);
      cuenta = cuenta -1;
      if(this.authScv.isLoggedIn){
        this.router.navigate(['/donacion/tabs/tab1']);
      }else{
        if(cuenta === 0){
          cuenta = 30;
          console.log('hola');
          this.isartive = true;
        }
      }
      if(cronometro === 15 || cronometro === 45 || cronometro === 30 || cronometro === 0 || cronometro === 60 ){
      }
    });
  }

  verificate(){
    this.authScv.SignOut();
  }

}

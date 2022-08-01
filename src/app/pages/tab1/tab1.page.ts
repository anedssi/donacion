import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../auth/authentication.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  user: any;
  isadmin = false;
  constructor(
    public authScv: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.authScv.getuserid(this.authScv.userid).subscribe((data) => {
      this.user = data;
      this.isadmin = this.user.admin;
      },
      (err)=>{
        console.error(err);
    });
  }
}

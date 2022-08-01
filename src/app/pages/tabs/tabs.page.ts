import { Component } from '@angular/core';
import { AuthenticationService } from './../auth/authentication.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  user: any;
  isadmin = false;
  constructor(
    public authScv: AuthenticationService
  ) {
    this.authScv.getuserid(this.authScv.userid).subscribe((data) => {
      this.user = data;
      this.isadmin = this.user.admin;
      },
      (err)=>{
        console.error(err);
    });
  }

}

import { Component } from '@angular/core';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myflix-Angular';

  constructor( public dialog: MatDialog){ }
  
   public openRegistrationDialog() : void {
    this.dialog.open(RegistrationComponent, { width: '380px'});
   }
   public openLoginDialog() : void {
    this.dialog.open(LoginComponent, { width: '400px'});
   }
   
}

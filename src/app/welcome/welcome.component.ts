import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public openRegistrationDialog() : void {
    this.dialog.open(RegistrationComponent, { width: '400px'});
   }
   public openLoginDialog() : void {
    this.dialog.open(LoginComponent, { width: '400px'});
   }

}

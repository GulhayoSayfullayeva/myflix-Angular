import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';
import { LoginComponent } from '../login/login.component';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

   /**
   * this opens the dialog registration when the signup button is clicked
   */
  public openRegistrationDialog() : void {
    localStorage.clear();
    console.log(localStorage.getItem('token'));
    this.dialog.open(RegistrationComponent, { width: '400px', data: {title: 'REGISTER', button: 'Signup', function: 'registerUser()'}});
   }

    /**
   * this opens the dialog login when the login button is clicked
   */
   public openLoginDialog() : void {
    this.dialog.open(LoginComponent, { width: '400px'});
   }

}

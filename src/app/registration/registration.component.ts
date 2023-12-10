import { Component, OnInit, Input, Inject, ChangeDetectorRef } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';
import {MatDialogRef}  from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfileComponent } from '../profile/profile.component';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  @Input() userData : any= { username: '', password: '', email: '', birthday: ''};

  token : any = localStorage.getItem('token');

  constructor(public fetchApiData: FetchApiDataService,
              public dialogRef: MatDialogRef<RegistrationComponent>,
              public snackBarRef: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: { title: string, button: string, function: string},
              
    ) {
    
   }
 
  ngOnInit(): void {
    if( this.token !== null ){
      this.userData = JSON.parse(localStorage.getItem('user') || '');
      this.userData.password = '';
      console.log(this.userData);
    }
  }
 /**
   * this sends userData object to db in order to register, when register button clicked
   */
  registerUser(): void{
    this.fetchApiData.userRregistration(this.userData).subscribe((response) => {
      this.dialogRef.close();
      console.log(response);
      this.snackBarRef.open('User registered successfully!', 'OK', { duration: 2000});
    }, (response) => {
      console.log(response);
      this.snackBarRef.open(response, 'OK', {  duration: 2000});
    });

  }

   /**
   * this sends updated user object to db, when update user button clicked
   */
  updateUser(): void {
     this.fetchApiData.updateUser(this.userData).subscribe((response) => {
      localStorage.setItem('user', JSON.stringify(response));
      this.dialogRef.close();
      this.snackBarRef.open('User updated successfully!!', 'OK', {duration: 2000});
      
     }, (response) => {
      console.log(response);
      this.snackBarRef.open(response, 'OK', {  duration: 2000});
     });
  }

}

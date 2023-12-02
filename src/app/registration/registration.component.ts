import { Component, OnInit, Input, Inject } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';
import {MatDialogRef}  from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  @Input() userData = { username: '', password: '', email: '', birthday: ''};


  constructor(public fetchApiData: FetchApiDataService,
              public dialogRef: MatDialogRef<RegistrationComponent>,
              public snackBarRef: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: { title: string, button: string, function: string}
    ) {
    
   }

  ngOnInit(): void {
  }

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

}

import { Component, OnInit, Input } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';
import {MatDialogRef}  from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() loginData = { username: '', password: ''}

  constructor(public fetchApi: FetchApiDataService,
              public matdialog: MatDialogRef<LoginComponent>,
              public snackbar: MatSnackBar) { }

  ngOnInit(): void {
  }

  public loginUser() : void{
     this.fetchApi.userLogin(this.loginData).subscribe((result) => {
        // Successfully login done
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);

        this.matdialog.close();
        this.snackbar.open('Login successfull!!!', 'OK', { duration: 2000});

        
     }, (response) => {
        this.snackbar.open(response, 'OK', { duration: 2000});
     });

  }

}

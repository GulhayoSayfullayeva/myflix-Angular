import { Component, OnInit, Input } from '@angular/core';

import { FetchApiDataService } from '../fetch-api-data.service';
import {MatDialogRef}  from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  @Input() loginData = { username: '', password: ''}

  constructor(public fetchApi: FetchApiDataService,
              public matdialog: MatDialogRef<LoginComponent>,
              public snackbar: MatSnackBar,
              public router: Router) { }

  ngOnInit(): void {
  }

  /**
   *Login user with credentials,  after succeccfully login, navigate to home page
   *@param loginData
   *@returns current user data
  */
  public loginUser() : void{
     this.fetchApi.userLogin(this.loginData).subscribe((result) => {
        // Successfully login done
        localStorage.setItem('user', JSON.stringify(result.user));
        localStorage.setItem('token', result.token);
        this.matdialog.close();
        this.snackbar.open('Login successfull!!!', 'OK', { duration: 2000});
        this.router.navigate(['movies']);
        
     }, (response) => {
        this.snackbar.open(response, 'OK', { duration: 2000});
     });

  }

}

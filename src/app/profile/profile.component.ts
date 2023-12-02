import { Component, Input, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user : any = { username: '', password: '', email: '', birthday: ''};

  constructor(public fetchApi: FetchApiDataService,
              public router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadUser();
  }

  public loadUser(): void{
    this.user =  this.fetchApi.getOneUser();
    console.log(this.user);
      return this.user;
  }

  public back() : void {
     this.router.navigate(['movies']);
  }
  public updateUser(): void{
     // Used registartionComponent with another shared variables
     this.dialog.open(RegistrationComponent, { width: '400px', height: '400px', data: {title: 'UPDATE USER', button: 'Update'}});

  }
  public deregisterUser():void{

  }

}

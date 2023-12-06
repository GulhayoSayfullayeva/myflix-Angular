import { Component, Input, OnInit, Inject } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { RegistrationComponent } from '../registration/registration.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  user: any = { username: '', password: '', email: '', birthday: '' };
  favouriteMovies : any[] = [];
  constructor(public fetchApi: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadUser();
  }

  public loadUser(): void {
    this.user = this.fetchApi.getOneUser();
    this.fetchApi.getAllMovies().subscribe((response) => {
      this.favouriteMovies = response.filter((movie: any) => this.user.favourite_movies.includes(movie._id));
    });
  }

  public back(): void {
    this.router.navigate(['movies']);
  }
  public updateUser(): void {
    // Used registartionComponent with another shared variables
    this.dialog.open(RegistrationComponent, { width: '400px', height: '400px', data: { title: 'UPDATE USER', button: 'Update', function: 'updateUser()' } });
    this.fetchApi.currentUser.subscribe(userData => this.user = userData);
  }
  public deregisterUser(): void {
    this.fetchApi.deleteUser().subscribe((response) => {
        console.log('Deleted');
        localStorage.clear();
        this.router.navigate(['welcome']);
    

    });

  }


}

import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {

  movies : any[] = [];

  constructor(public fetchApi: FetchApiDataService,
              public router: Router) { }

  ngOnInit(): void {
    this.getAllMovies();
  }

  public getAllMovies(): void {
    this.fetchApi.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(response);
      return this.movies;
    });
  }

  public openProfile(): void {
       this.router.navigate(['profile']);
  }
  public logoutUser() : void{
    localStorage.setItem('token', '');
    localStorage.setItem('user', '');
    this.router.navigate(['welcome']);
  }

}

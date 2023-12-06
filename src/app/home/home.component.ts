import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  moviesList : any[] = [];
  user = JSON.parse(localStorage.getItem('user') || '');

  constructor(public fetchApi: FetchApiDataService,
              public router: Router,
              public dialog: MatDialog,
              public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getAllMovies();
  }

  public getAllMovies(): void {
    this.fetchApi.getAllMovies().subscribe((response: any) => {
      this.moviesList = response;
      console.log(this.moviesList);
    });
  }

  public isFavourite(movieId: string) : boolean{
    return this.user.favourite_movies.includes(movieId);
  }

  public addToFavouriteList(movieId: string){
      this.user.favourite_movies.push(movieId);
      localStorage.setItem('user', JSON.stringify(this.user));
      this.fetchApi.addToFavourite(movieId).subscribe((response) => {
        console.log(response);
      })
      this.snackBar.open('Movie is added to favouriteList successfully!', 'OK', {duration: 2000});

  }
  public removeFromFavouriteList(movieId: string){
    let favouriteMovies = this.user.favourite_movies.filter((id: string) => id != movieId);
    this.user.favourite_movies = favouriteMovies;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.fetchApi.deleteFromFavourite(movieId).subscribe((response) => {
      console.log(response);
    })
    this.snackBar.open('Movie is removed from favouriteList successfully!', 'OK', {duration: 2000});
  }

  public openGenreDetails(genre: any){
    this.dialog.open(GenreComponent, { width: '400px', height: '300px', data: {genre: genre}});
  }

  public openDirectorDetails(director: any){
    this.dialog.open(DirectorComponent, { width: '400px', height: '300px', data: {director: director}});
  }

  public openMovieDetails(details: string){
    this.dialog.open(MovieDetailsComponent, { width: '400px', height: '300px', data: {details: details}});
  }

}

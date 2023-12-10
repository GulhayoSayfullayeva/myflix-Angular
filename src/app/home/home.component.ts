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
  /**
   * @returns all the movie list
   */
  public getAllMovies(): void {
    this.fetchApi.getAllMovies().subscribe((response: any) => {
      this.moviesList = response;
      console.log(this.moviesList);
    });
  }

  /**
   * Check if the movie is in favouriteLIst of the current user
   * @param movieId 
   * @returns if the given movie is favourite or not
   */
  public isFavourite(movieId: string) : boolean{
    return this.user.favourite_movies.includes(movieId);
  }
  /**
   * Add the given movie to the favouriteList of the current user, when the icon is clicked
   * @param movieId 
   */
  public addToFavouriteList(movieId: string){
      this.user.favourite_movies.push(movieId);
      localStorage.setItem('user', JSON.stringify(this.user));
      this.fetchApi.addToFavourite(movieId).subscribe((response) => {
        console.log(response);
      })
      this.snackBar.open('Movie is added to favouriteList successfully!', 'OK', {duration: 2000});

  }
  /**
   * Delete the given movie from the favouriteList of the current user, when the icon is clicked
   * @param movieId 
   */
  public removeFromFavouriteList(movieId: string){
    let favouriteMovies = this.user.favourite_movies.filter((id: string) => id != movieId);
    this.user.favourite_movies = favouriteMovies;
    localStorage.setItem('user', JSON.stringify(this.user));
    this.fetchApi.deleteFromFavourite(movieId).subscribe((response) => {
      console.log(response);
    })
    this.snackBar.open('Movie is removed from favouriteList successfully!', 'OK', {duration: 2000});
  }
  /**
   * Opens the genre dialog to show the genre details, when genre button clicked
   * @param genre 
   */
  public openGenreDetails(genre: any){
    this.dialog.open(GenreComponent, { width: '400px', height: '300px', data: {genre: genre}});
  }

  /**
   * Opens director dialog to show director details, when director button clicked
   * @param director 
   */
  public openDirectorDetails(director: any){
    this.dialog.open(DirectorComponent, { width: '400px', height: '300px', data: {director: director}});
  }

  /**
   * opens movieDetails dialog to show movie details, when details button clicked
   * @param details 
   */
  public openMovieDetails(details: string){
    this.dialog.open(MovieDetailsComponent, { width: '400px', height: '300px', data: {details: details}});
  }

}

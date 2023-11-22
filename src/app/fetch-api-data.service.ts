import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs';

// Url that provide the data for the client
const apiUrl = 'https://myflix-h3mr.onrender.com';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor(private http: HttpClient) { }

  //Making api call for the user registration endpoint
  public userRregistration(userDetails: any): Observable<any>{
    console.log(userDetails);
    return this.http.post(apiUrl + '/users', userDetails).pipe(
    catchError(this.handleError));
  }

  
 // Making api call for getting the list of movies
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  // Making api call for the user login 
  public userLogin(userDetails: any): Observable<any> {
    return this.http.post(apiUrl + '/login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  // Making api call in order to get one movie with its title
  public getOneMovie(title: string) : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies/' + title, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
   // Making api call in order to get director info with its name
   public getDirector(directorName: string) : Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + '/movies/directors/' + directorName, {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
 // Making api call in order to get one genre info with its name
 public getGenre(genreName: string) : Observable<any> {
  const token = localStorage.getItem('token');
  return this.http.get(apiUrl + '/movies/genreName/' + genreName, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    }
  )}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}
 // Making api call in order to get user 
 public getOneUser() : Observable<any> {
  const user = JSON.parse(localStorage.getItem('user') || '');
  return user;
}

 // Making api call in order to get favourite movies list of the user
 public getFavorites() : Observable<any> {
  const user = JSON.parse(localStorage.getItem('user') || '');
  return user.favourite_movies;
  
}

 // Making api call in order to add movie to the favouritelist of the user
 public addFavouriteMovie(movieId: string) : Observable<any> {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || '');
  user.favourite_movies.push(movieId);
  localStorage.setItem('user', JSON.stringify(user));
  return this.http.post(apiUrl + '/users/' + user.username + '/' + movieId, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    }
  )}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

 // Making api call in order to update user
 public updateUser(updatedUser: any) : Observable<any> {
  const user = JSON.parse(localStorage.getItem('user') || '');
  const token = localStorage.getItem('token');
  return this.http.put(apiUrl + '/users/' + user.username, updatedUser, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    }
  )}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Making api call in order to delete user
public deleteUser() : Observable<any> {
  const user = JSON.parse(localStorage.getItem('user') || '');
  const token = localStorage.getItem('token');
  return this.http.delete(apiUrl + '/users/' + user.username, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    }
  )}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}

// Making api call in order to delete given movie from  users favouritelist
public deleteFromFavourite(movieId: string) : Observable<any> {
  const user = JSON.parse(localStorage.getItem('user') || '');
  const token = localStorage.getItem('token');
  user.favourite_movies.filter((id: string) => id !== movieId );
  localStorage.setItem('user', JSON.stringify(user));
  return this.http.delete(apiUrl + '/users/' + user.username + '/' + movieId, {headers: new HttpHeaders(
    {
      Authorization: 'Bearer ' + token,
    }
  )}).pipe(
    map(this.extractResponseData),
    catchError(this.handleError)
  );
}



// Non-typed response extraction
  private extractResponseData(res: any): any {
    const body = res;
    return body || { };
  }

  
  private handleError(error: HttpErrorResponse):any {
    if(error.error instanceof ErrorEvent){
      console.error('Error occured: ', error.error.message);
    }
    else{
      console.error(`Error Status code ${error.status}, ` +
      `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}

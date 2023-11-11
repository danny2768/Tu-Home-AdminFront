import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl;

  constructor( private http: HttpClient) { }

  get userToken(){
    if ( !localStorage.getItem('auth_token') ) return '';

    return localStorage.getItem('auth_token')
  }


  registerUser( user: User ): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/register`, user)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }

  loginUser( user: User ): Observable<boolean>{
    return this.http.post<boolean>(`${this.baseUrl}/authenticate`, user)
      .pipe(
        tap( token => {
          localStorage.setItem('auth_token', JSON.stringify(token))
        }),
        map( resp => true ),
        catchError( err => of(false) ),
      )
  }

}

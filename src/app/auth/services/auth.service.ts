import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core'

import { Observable, catchError, map, of, tap } from 'rxjs';
;
import { environments } from 'src/environments/environments';
import { User } from 'src/app/shared/interfaces/user.interface';
import { Token } from 'src/app/admin/interfaces/token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl;

  constructor( private http: HttpClient) { }

  private get userToken(): string {
    if ( !localStorage.getItem('auth_token') ) return '';
    const token: Token =  JSON.parse( localStorage.getItem('auth_token')! )
    return token.accessToken;
  }


  registerUser( user: Partial<User> ): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/register`, user)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }

  loginUser( user: Partial<User> ): Observable<boolean>{
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

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

  registerUser( user: User ): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/register`, user)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }


}

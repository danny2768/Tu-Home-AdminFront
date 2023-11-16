import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core'

import { Observable, Subject, catchError, map, of, takeUntil, tap, throwError } from 'rxjs';
;
import { environments } from 'src/environments/environments';
import { User } from 'src/app/shared/interfaces/user.interface';
import { Token } from 'src/app/admin/interfaces/token.interface';
import { AdminService } from '../../admin/services/admin.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl;

  private unsubscribe$ = new Subject<void>();

  constructor(
    private http: HttpClient,
    private router: Router,
  ){}

  private get userToken(): string {
    if ( !localStorage.getItem('auth_token') ) return '';
    const token: Token =  JSON.parse( localStorage.getItem('auth_token')! )
    return token.accessToken;
  }

  private get authHeader(): HttpHeaders{
    return new HttpHeaders({ Authorization: `Bearer ${this.userToken}` })
  }

  registerUser( user: Partial<User> ): Observable<boolean> {
    return this.http.post(`${this.baseUrl}/register`, user)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }

  loginUser( user: Partial<User> ): Observable<boolean>{
    // if( user.email ) this.saveCurrentUser(user.email);
    return this.http.post<boolean>(`${this.baseUrl}/authenticate`, user)
      .pipe(
        tap( token => {
          localStorage.setItem('auth_token', JSON.stringify(token));
          if (user.email) {
            this.saveCurrentUser(user.email);
          }
        }),
        map( resp => true ),
        catchError( err => of(false) ),
      )
  }

  private saveCurrentUser( userEmail: string ): void{
    this.http.get<User>(`${this.baseUrl}/api/users/findByEmail/${userEmail}`, { headers: this.authHeader })
      .pipe(
        takeUntil(this.unsubscribe$),
      )
      .subscribe( user => {
        // console.log(user);
        localStorage.setItem('current_user', JSON.stringify(user))
      })
  }

  get currentUser(): User | null{
    if ( !localStorage.getItem('auth_token') ) return null;
    const currentUser: User = JSON.parse( localStorage.getItem('current_user')! )
    return currentUser;
  }

  authStatus(): boolean{
    if ( !localStorage.getItem('auth_token') ) return false;
    return true;
  };

  logOut(){
    localStorage.removeItem('auth_token');
    localStorage.removeItem('current_user');

    this.unsubscribe$.next();
    this.unsubscribe$.complete();

    this.router.navigateByUrl('/')
  }

}

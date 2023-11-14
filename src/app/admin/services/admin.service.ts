import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, catchError, map, of } from 'rxjs';

import { environments } from 'src/environments/environments';
import { User } from 'src/app/shared/interfaces/user.interface';
import { Token } from '../interfaces/token.interface';
import { Property } from '../interfaces/property.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private baseUrl = environments.baseUrl;

  constructor( private http: HttpClient) { }

  private get userToken(): string {
    if ( !localStorage.getItem('auth_token') ) return '';
    const token: Token =  JSON.parse( localStorage.getItem('auth_token')! )
    return token.accessToken;
  }

  private get authHeader(): HttpHeaders{
    return new HttpHeaders({ Authorization: `Bearer ${this.userToken}` })
  }
  // TODO: Implement http interceptor

  // # Http req related to USERS
  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(`${this.baseUrl}/api/users`, { headers: this.authHeader });
  }

  getUserById( id: string ): Observable<User | undefined> {
    return this.http.get<User>(`${this.baseUrl}/api/users/${id}`, { headers: this.authHeader })
      .pipe(
        catchError( err => of(undefined))
      );
  }

  deleteUserById( id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/api/users/${id}`, { headers: this.authHeader })
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }

  updateUser( user: User, id: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/api/users/${id}`, user, { headers: this.authHeader })
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }

  // # Http req related to REAL STATE PROPERTIES

  createProperty( property: Partial<Property> ): Observable<boolean> {
    return this.http.post<boolean>(`${this.baseUrl}/register`, property, { headers: this.authHeader })
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }

  getProperties(): Observable<Property[]>{
    return this.http.get<Property[]>(`${this.baseUrl}/api/properties`, { headers: this.authHeader });
  }

  getPropertyById( id: string ): Observable<Property | undefined>{
    return this.http.get<Property>(`${this.baseUrl}/api/properties/${id}`, { headers: this.authHeader })
      .pipe(
        catchError( err => of(undefined))
      );
  }

  updateProperty( property: Property, id: string): Observable<boolean> {
    return this.http.put<boolean>(`${this.baseUrl}/api/properties/${id}`, property, { headers: this.authHeader })
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }

  deletePropertyById( id: string): Observable<boolean> {
    return this.http.delete(`${this.baseUrl}/api/properties/${id}`, { headers: this.authHeader })
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
      );
  }

}

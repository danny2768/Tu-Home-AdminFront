import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';
import { catchError } from 'rxjs';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  public loginError: boolean = false;

  public loginForm: FormGroup = this.fb.group({
    email: ['', [ Validators.required ]],
    password: ['', [ Validators.required ]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ){}

  onLogin(): boolean {
    if ( this.loginForm.invalid ) {
      this.loginForm.markAllAsTouched();
      console.warn('No ha cumplido las validaciones');
      return false;
    }

    const user = this.loginForm.value as User;

    this.authService.loginUser( user )
      .subscribe( isAuthenticated => {
        if ( !isAuthenticated ){
          this.loginError = true;
          return false;
        };

        this.router.navigate(['/admin'])
        return true;
      })
    return false;
  }


  // # Validaciones de campos
  isValidField( field: string): boolean | null {
    return this.loginForm.controls[field].errors
      && this.loginForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {
    if ( !this.loginForm.controls[field] ) return null;

    const errors = this.loginForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ){
        case "required":
          return `Este campo es requerido`;
        case 'email':
          return `Debe ingresar un email para continuar`
      }
    }
    return null;
  }
}

import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'auth-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnDestroy{

  public loginError: boolean = false;
  private subscription?: Subscription;

  public loginForm: FormGroup = this.fb.group({
    email: ['', [ Validators.required ]],
    password: ['', [ Validators.required ]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ){}

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

  onLogin(): boolean {
    if ( this.loginForm.invalid ) {
      this.loginForm.markAllAsTouched();
      console.warn('No ha cumplido las validaciones');
      return false;
    }

    const user = this.loginForm.value as User;

    this.subscription = this.authService.loginUser( user )
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

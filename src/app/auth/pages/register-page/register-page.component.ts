import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/shared/interfaces/user.interface';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'auth-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnDestroy{

  private subscription?: Subscription;

  public registerForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required ]],
    surname: ['', [ Validators.required ]],
    email: ['', [ Validators.required, Validators.email ]],
    password: ['', [ Validators.required, Validators.minLength(8) ]],
    documentNumber: ['', [ Validators.required ]],
    documentType: [1, [ Validators.required ]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ){}

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

  onRegister(): boolean {
    if ( this.registerForm.invalid ) {
      this.registerForm.markAllAsTouched();
      console.warn('No ha cumplido las validaciones');
      return false;
    }

    const user = this.registerForm.value as User;

    this.subscription = this.authService.registerUser( user )
      .subscribe( wasRegistred => {
        if ( !wasRegistred ){
          console.log('El usuario no ha sido registrado');
          return false;
        };

        console.log('El usuario fue registrado');
        return true;
      })

    return false;
  }

  isValidField( field: string): boolean | null {
    return this.registerForm.controls[field].errors
      && this.registerForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {
    if ( !this.registerForm.controls[field] ) return null;

    const errors = this.registerForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ){
        case "required":
          return `Este campo es requerido`;
        case "minlength":
          return `Minimo ${errors['minlength'].requiredLength } caracteres.`;
        case 'email':
          return `Debe ingresar un email para continuar`
      }
    }

    return null;
  }

}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../interfaces/user.interface';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'auth-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {

  public registerForm: FormGroup = this.fb.group({
    name: ['', [ Validators.required ]],
    surname: ['', [ Validators.required ]],
    email: ['', [ Validators.required ]],
    password: ['', [ Validators.required ]],
    documentNumber: ['', [ Validators.required ]],
    documentType: [1, [ Validators.required ]],
  });

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
  ){}

  onRegister(): boolean {
    if ( this.registerForm.invalid ) {
      this.registerForm.markAllAsTouched();
      console.warn('No ha cumplido las validaciones');
      return false;
    }

    const user = this.registerForm.value as User;

    this.authService.registerUser( user )
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

}

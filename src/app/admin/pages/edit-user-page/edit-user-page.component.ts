import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'admin-edit-user-page',
  templateUrl: './edit-user-page.component.html',
  styleUrls: ['./edit-user-page.component.css']
})
export class EditUserPageComponent implements OnInit ,OnDestroy{

  private subscription?: Subscription;
  private subscription1?: Subscription;

  public user?: User
  private userId?: string;

  public editUserForm: FormGroup = this.fb.group({
    name:            [ '',    [ Validators.required ]],
    surname:         [ '',    [ Validators.required ]],
    email:           [ '',    [ Validators.required, Validators.email ]],
    password:        [ '',    [ Validators.required, Validators.minLength(8) ]],
    documentNumber:  [ '',    [ Validators.required ]],
    documentType:    [ 10000,     [ Validators.required ]],
    role:            [ 10005, [ Validators.required ]],
  });

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.subscription1 = this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.adminService.getUserById( id ))
      )
      .subscribe( user => {
        if (!user) return this.router.navigate(['./admin/manage/users']);

        setTimeout(() => {
          this.initializeForm();
        }, 300);

        this.userId = `${user.id}`;
        return this.user = user;
      })
  }

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }

    if ( this.subscription1 ) {
      this.subscription1.unsubscribe();
    }
  }

  initializeForm(): void {
    this.editUserForm.reset({
      name: this.user?.name,
      surname: this.user?.surname,
      email: this.user?.email,
      password: '',
      documentNumber: this.user?.documentNumber,
      documentType: this.user?.documentType,
      role: this.user?.role,
    })
  }

  onEdit(): boolean {
    if ( this.editUserForm.invalid ) {
      this.editUserForm.markAllAsTouched();
      console.warn('No ha cumplido las validaciones');
      return false;
    }

    const user = this.editUserForm.value as User;

    // console.log(user);

    this.subscription = this.adminService.updateUser( user, this.userId! )
      .subscribe( wasUpated => {
        if ( !wasUpated ) {
          alert("Error al editar el usuario");
          return false;
        }

        console.log('El usuario fue actualizado');
        alert("El usuario fue actualizado con exito.");
        this.router.navigate(['./admin/manage/users'])
        return true;
      })

    return false;
  }

  // # Field validations
  isValidField( field: string): boolean | null {
    return this.editUserForm.controls[field].errors
      && this.editUserForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {
    if ( !this.editUserForm.controls[field] ) return null;

    const errors = this.editUserForm.controls[field].errors || {};

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

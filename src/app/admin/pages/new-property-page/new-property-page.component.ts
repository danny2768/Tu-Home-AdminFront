import { Component, OnDestroy } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Property } from '../../interfaces/property.interface';

@Component({
  selector: 'app-new-property-page',
  templateUrl: './new-property-page.component.html',
  styleUrls: ['./new-property-page.component.css']
})
export class NewPropertyPageComponent implements OnDestroy{

  private subscription?: Subscription;

  public newPropertyForm: FormGroup = this.fb.group({
    name:               ['', [ Validators.required ] ],
    address:            ['', [ Validators.required ] ],
    price:              ['', [ Validators.required ] ],
    squareFeet:         ['', [ Validators.required ] ],
    bedrooms:           [null,  [ Validators.required ] ],
    bathrooms:          [null,  [ Validators.required ] ],
    garage:             [false, [ Validators.required ] ],
    patio:              [false, [ Validators.required ] ],
    elevator:           [false, [ Validators.required ] ],
    typeOfProperty:     [10014, [ Validators.required ] ],
  })

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private router: Router
  ){}

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

  onRegister(): boolean {
    if ( this.newPropertyForm.invalid ) {
      this.newPropertyForm.markAllAsTouched();
      console.warn('No ha cumplido las validaciones');
      return false;
    }

    const property = this.newPropertyForm.value as Property;

    this.subscription = this.adminService.createProperty( property )
      .subscribe( wasRegistred => {
        if ( !wasRegistred ){
          alert('Ha ocurrido un error al registrar el imbueble.')
          console.log('El imbueble no ha sido registrado');
          return false;
        };

        alert('El imbueble ha sido registrado con exito.')
        console.log('El imbueble fue registrado');
        this.router.navigate(['./admin/manage/properties'])
        return true;
      })

    return false;
  }

  // # Field validations
  isValidField( field: string): boolean | null {
    return this.newPropertyForm.controls[field].errors
      && this.newPropertyForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {
    if ( !this.newPropertyForm.controls[field] ) return null;

    const errors = this.newPropertyForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ){
        case "required":
          return `Este campo es requerido`;
      }
    }

    return null;
  }
}

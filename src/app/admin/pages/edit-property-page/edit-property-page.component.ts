import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from '../../interfaces/property.interface';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-property-page',
  templateUrl: './edit-property-page.component.html',
  styleUrls: ['./edit-property-page.component.css']
})
export class EditPropertyPageComponent implements OnInit, OnDestroy{

  private subscription?: Subscription;

  public property?: Property
  private propertyId?: string;

  public editPropertyForm: FormGroup = this.fb.group({
    name:               ['', [ Validators.required ] ],
    address:            ['', [ Validators.required ] ],
    price:              ['', [ Validators.required ] ],
    squareFeet:         ['', [ Validators.required ] ],
    bedrooms:           [0,  [ Validators.required ] ],
    bathrooms:          [0,  [ Validators.required ] ],
    garage:             [false, [ Validators.required ] ],
    patio:              [false, [ Validators.required ] ],
    elevator:           [false, [ Validators.required ] ],
    typeOfProperty:     [10014, [ Validators.required ] ],
    furnitureInventory: [null],
  })

  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.adminService.getPropertyById( id ))
      )
      .subscribe( property => {
        if (!property) return this.router.navigate(['./admin/manage/properties']);

        setTimeout(() => {
          this.initializeForm();
        }, 300);
        this.propertyId = property.id.toString();
        return this.property = property;
      })
  }

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

  initializeForm(): void {
    this.editPropertyForm.reset({
      name:               this.property?.name,
      address:            this.property?.address,
      price:              this.property?.price,
      squareFeet:         this.property?.squareFeet,
      bedrooms:           this.property?.bedrooms,
      bathrooms:          this.property?.bathrooms,
      garage:             this.property?.garage,
      patio:              this.property?.patio,
      elevator:           this.property?.elevator,
      typeOfProperty:     this.property?.typeOfProperty,
      furnitureInventory: this.property?.furnitureInventory,
    })
  }

  onEdit(): boolean {
    if ( this.editPropertyForm.invalid ) {
      this.editPropertyForm.markAllAsTouched();
      console.warn('No ha cumplido las validaciones');
      return false;
    }

    const property = this.editPropertyForm.value as Property;

    // console.log(user);

    this.subscription = this.adminService.updateProperty( property, this.propertyId! )
      .subscribe( wasUpated => {
        if ( !wasUpated ) {
          alert("Error al editar la propiedad");
          return false;
        }

        alert("La propiedad fue actualizada con exito.");
        this.router.navigate(['./admin/manage/properties'])
        return true;
      })

    return false;
  }

  // # Field validations
  isValidField( field: string): boolean | null {
    return this.editPropertyForm.controls[field].errors
      && this.editPropertyForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {
    if ( !this.editPropertyForm.controls[field] ) return null;

    const errors = this.editPropertyForm.controls[field].errors || {};

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

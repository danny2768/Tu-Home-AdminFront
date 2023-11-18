import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contract } from '../../interfaces/contract.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-contract-page',
  templateUrl: './new-contract-page.component.html',
  styleUrls: ['./new-contract-page.component.css']
})
export class NewContractPageComponent {

  private subscription?: Subscription;

  public newContractForm: FormGroup = this.fb.group({
    startDate:  ['', [ Validators.required ]],
    endDate:    ['', [ Validators.required ]],
    rent:       ['', [ Validators.required ]],
    deposit:    ['', [ Validators.required ]],
    status:     ['Activo', [ Validators.required ]],
    userId:     [null, [ Validators.required ]],
    propertyId: [null, [ Validators.required ]],
  });

  constructor(
    private AdminService: AdminService,
    private fb: FormBuilder,
    private router: Router,
  ){}

  // TODO: implementar onDestroy

  onContract(): boolean{
    if ( this.newContractForm.invalid ) {
      this.newContractForm.markAllAsTouched();
      console.warn('No ha cumplido las validaciones');
      return false;
    }

    const startDateArray = this.dateToArray(this.newContractForm.value.startDate);
    const endDateArray = this.dateToArray(this.newContractForm.value.endDate);

    const contract: Contract = {
      ...this.newContractForm.value,
      startDate: startDateArray,
      endDate: endDateArray,
    };

    // const contract = this.newContractForm.value as Contract;

    this.subscription = this.AdminService.createContract( contract )
      .subscribe( wasRegistred => {
        if ( !wasRegistred ){
          alert('Ha ocurrido un error al crear el contrato.')
          console.log('El contrato no ha sido registrado');
          return false;
        };

        alert('El contrato ha sido registrado con exito.')
        console.log('El contrato fue registrado');
        this.router.navigate(['./admin/manage/properties/', contract.propertyId])
        return true;
      })

    return false;
  }

  dateToArray(date: any): number[] {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      console.error('Fecha no válida');
      return [];
    }
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  }


  // # Field validations
  isValidField( field: string): boolean | null {
    return this.newContractForm.controls[field].errors
      && this.newContractForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {
    if ( !this.newContractForm.controls[field] ) return null;

    const errors = this.newContractForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ){
        case "required":
          return `Este campo es requerido`;
      }
    }

    return null;
  }
}

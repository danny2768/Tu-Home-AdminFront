import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { Property } from '../../interfaces/property.interface';

@Component({
  selector: 'admin-property-page',
  templateUrl: './property-page.component.html',
  styleUrls: ['./property-page.component.css']
})
export class PropertyPageComponent implements OnInit, OnDestroy{

  private subscription?: Subscription;
  private subscription1?: Subscription;

  public property?: Property;

  constructor(
    private adminService: AdminService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.subscription = this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.adminService.getPropertyById( id ))
      )
      .subscribe( property => {
        if (!property) return this.router.navigate(['./admin/manage/users']);

        return this.property = property;
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

  onDelete(): boolean {

    const resp = confirm(`Estas seguro de que deseas eliminar la propiedad ${this.property?.id}`)

    if( resp ) {
      this.subscription1 = this.adminService.deletePropertyById( this.property?.id.toString()! )
      .subscribe( wasDeleted => {
        if ( !wasDeleted ) {
          alert('Ha occurido un error al eliminar la propiedad')
          return false;
        }

        alert('Propiedad eliminada correctamente');
        this.router.navigate(['./admin/manage/properties']);
        return true;
      })
    }
    return false;
  }

  onEdit(): void {
    this.router.navigate([`./admin/edit/property/${this.property?.id}`])
  }
}

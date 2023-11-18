import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { AdminService } from '../../services/admin.service';
import { Property } from '../../interfaces/property.interface';
import { Content } from '../../interfaces/imageProperty.interface';

@Component({
  selector: 'admin-property-page',
  templateUrl: './property-page.component.html',
  styleUrls: ['./property-page.component.css']
})
export class PropertyPageComponent implements OnInit, OnDestroy{

  private subscription?: Subscription;
  private subscription1?: Subscription;
  private subscription2?: Subscription;

  public property?: Property;
  public propertyImage?: string;


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
      });

    this.subscription1 = this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.adminService.getImageByPropertyId( id ))
      )
      .subscribe( content => {
        if (content.length === 0) return this.propertyImage = '/assets/defaultproperty.png';
        return this.propertyImage = content[ content.length - 1 ].url;
      });
  }

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }

    if ( this.subscription1 ) {
      this.subscription1.unsubscribe();
    }

    if ( this.subscription2 ) {
      this.subscription2.unsubscribe();
    }
  }

  onDelete(): boolean {

    const resp = confirm(`Estas seguro de que deseas eliminar la propiedad ${this.property?.id}`)

    if( resp ) {
      this.subscription2 = this.adminService.deletePropertyById( this.property?.id.toString()! )
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

  test(){
    console.log(this.propertyImage);
  }
}

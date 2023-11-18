import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Property } from '../../interfaces/property.interface';
import { Subscription } from 'rxjs';
import { Content, Image } from '../../interfaces/imageProperty.interface';

@Component({
  selector: 'admin-list-properties-page',
  templateUrl: './list-properties-page.component.html',
  styleUrls: ['./list-properties-page.component.css']
})
export class ListPropertiesPageComponent implements OnInit, OnDestroy{

  private subscription?: Subscription;
  private subscription1?: Subscription;

  public propertyList?: Property[];
  public imageList?: Content[];

  constructor (
    private adminService: AdminService,
  ){}

  ngOnInit(): void {
    // * Obtener lista de propiedades
    this.subscription = this.adminService.getProperties()
      .subscribe( properties => {
        this.propertyList = properties;
      });

    // * Obtener lista de imagenes
    this.subscription1 = this.adminService.getImages()
      .subscribe( images => {
        this.imageList = images;
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

  onImage( propertyId: number ): string {
    const image = this.imageList?.find( image => image.property === propertyId);
    return image?.url ?? '/assets/defaultproperty.png';
  }
}

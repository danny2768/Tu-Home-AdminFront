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

  public propertyList?: Property[];
  private subscription?: Subscription;

  constructor (
    private adminService: AdminService,
  ){}

  ngOnInit(): void {
    // * Obtener lista de propiedades
    this.subscription = this.adminService.getProperties()
    .subscribe( properties => {
      this.propertyList = properties;
    });
  }

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }





}

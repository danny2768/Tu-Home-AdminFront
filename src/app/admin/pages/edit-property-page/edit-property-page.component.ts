import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { FormBuilder } from '@angular/forms';
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

        // setTimeout(() => {
        //   this.initializeForm();
        // }, 300);

        return this.property = property;
      })
  }

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

}

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
    throw new Error('Method not implemented.');
  }

}

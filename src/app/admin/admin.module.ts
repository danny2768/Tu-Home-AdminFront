import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListUsersPageComponent } from './pages/list-users-page/list-users-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ListPropertiesPageComponent } from './pages/list-properties-page/list-properties-page.component';
import { PropertyPageComponent } from './pages/property-page/property-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';


@NgModule({
  declarations: [
    ListUsersPageComponent,
    DashboardPageComponent,
    ListPropertiesPageComponent,
    PropertyPageComponent,
    LayoutPageComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }

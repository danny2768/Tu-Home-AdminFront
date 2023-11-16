import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPropertiesPageComponent } from './pages/list-properties-page/list-properties-page.component';
import { ListUsersPageComponent } from './pages/list-users-page/list-users-page.component';
import { PropertyPageComponent } from './pages/property-page/property-page.component';

import { SortByPipe } from './pipes/sort-by.pipe';


@NgModule({
  declarations: [
    ListUsersPageComponent,
    DashboardPageComponent,
    ListPropertiesPageComponent,
    PropertyPageComponent,
    LayoutPageComponent,
    EditUserPageComponent,

    // Pipes
    SortByPipe
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }

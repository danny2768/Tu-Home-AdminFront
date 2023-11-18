import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ListUsersPageComponent } from './pages/list-users-page/list-users-page.component';
import { ListPropertiesPageComponent } from './pages/list-properties-page/list-properties-page.component';
import { PropertyPageComponent } from './pages/property-page/property-page.component';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';
import { EditPropertyPageComponent } from './pages/edit-property-page/edit-property-page.component';
import { NewPropertyPageComponent } from './pages/new-property-page/new-property-page.component';
import { NotificationPageComponent } from './pages/notification-page/notification-page.component';
import { InventoryPageComponent } from './pages/inventory-page/inventory-page.component';
import { NewContractPageComponent } from './pages/new-contract-page/new-contract-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutPageComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardPageComponent
      },
      {
        path: 'notifications',
        component: NotificationPageComponent
      },
      {
        path: 'manage/users',
        component: ListUsersPageComponent
      },
      {
        path: 'manage/users/:id',
        component: EditUserPageComponent
      },
      {
        path: 'property/inventory',
        component: InventoryPageComponent
      },
      {
        path: 'manage/properties',
        component: ListPropertiesPageComponent
      },
      {
        path: 'manage/properties/:id',
        component: PropertyPageComponent
      },
      {
        path: 'edit/property/:id',
        component: EditPropertyPageComponent
      },
      {
        path: 'new/property',
        component: NewPropertyPageComponent
      },
      {
        path: 'new/contract',
        component: NewContractPageComponent
      },
      {
        path: '**',
        redirectTo: 'dashboard'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { ListUsersPageComponent } from './pages/list-users-page/list-users-page.component';
import { ListPropertiesPageComponent } from './pages/list-properties-page/list-properties-page.component';
import { PropertyPageComponent } from './pages/property-page/property-page.component';
import { EditUserPageComponent } from './pages/edit-user-page/edit-user-page.component';

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
        path: 'manage/users',
        component: ListUsersPageComponent
      },
      {
        path: 'manage/users/:id',
        component: EditUserPageComponent
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

import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    Error404PageComponent,
    SidebarComponent
  ],
  imports: [
    // CommonModule
    RouterModule
  ],
  exports: [
    Error404PageComponent,
    SidebarComponent
  ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { Error404PageComponent } from './pages/error404-page/error404-page.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    Error404PageComponent,
    SidebarComponent
  ],
  imports: [
    // CommonModule
  ],
  exports: [
    Error404PageComponent,
    SidebarComponent
  ]
})
export class SharedModule { }

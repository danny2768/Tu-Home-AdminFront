import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'admin-list-users-page',
  templateUrl: './list-users-page.component.html',
  styleUrls: ['./list-users-page.component.css']
})
export class ListUsersPageComponent implements OnInit, OnDestroy{

  private subscription?: Subscription;
  public userList?: User[];


  constructor( private adminService: AdminService ) { }

  ngOnInit(): void {
    // * Obtener lista de usuarios en la pagina
    this.subscription = this.adminService.getUsers()
    .subscribe( users => {
      this.userList = users;
    });
  }

  ngOnDestroy(): void {
    if ( this.subscription ) {
      this.subscription.unsubscribe();
    }
  }

}

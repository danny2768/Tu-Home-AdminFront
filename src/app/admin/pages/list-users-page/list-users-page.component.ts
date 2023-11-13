import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-list-users-page',
  templateUrl: './list-users-page.component.html',
  styleUrls: ['./list-users-page.component.css']
})
export class ListUsersPageComponent implements OnInit, OnDestroy{

  private subscription?: Subscription;
  private subscription1?: Subscription;

  public userList?: User[];


  constructor(
    private adminService: AdminService,
    private router: Router,
  ) { }

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

  onDelete( id: string): boolean {

    const resp = confirm(`Estas seguro de que deseas eliminar al usuario ${id}`)

    if( resp ) {
      this.subscription1 = this.adminService.deleteUserById( id )
      .subscribe( wasDeleted => {
        if ( !wasDeleted ) {
          return false;
        }

        alert('Usuario eliminado correctamente');
        window.location.reload();
        return true;
      })
    }
    return false;
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Contract } from '../../interfaces/contract.interface';

@Component({
  selector: 'admin-list-users-page',
  templateUrl: './list-users-page.component.html',
  styleUrls: ['./list-users-page.component.css']
})
export class ListUsersPageComponent implements OnInit, OnDestroy{

  private subscription?: Subscription;
  private subscription1?: Subscription;
  private subscription2?: Subscription;


  public userList?: User[];
  public orderby: keyof User | 'admin' |'' = '';


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
    if ( this.subscription1 ) {
      this.subscription1.unsubscribe();
    }
    if ( this.subscription2 ) {
      this.subscription2.unsubscribe();
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

  onEdit( userId: string ): void {
    this.router.navigate([`./admin/manage/users/${userId}`])
  }

  onProperty ( userId: number ): boolean {
    this.subscription2 = this.adminService.getContractByUserId( userId.toString() )
      .subscribe( contract => {
        if( contract.length === 0 ){
          alert('Este usuario no tiene ningun inmueble contratado.')
          return false;
        }
        this.router.navigateByUrl(`/admin/manage/properties/${contract[0].propertyId}`)
        return true;
      })

    return false;
  }

  changeOrder( value: keyof User | 'admin' ){
    this.orderby = value;
  }
}

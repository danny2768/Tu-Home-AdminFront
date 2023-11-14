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

  onProperty( userId: number ): boolean{

    let propertyId: number | undefined;

    this.adminService.getContracts()
      .subscribe((contracts: Contract[]) => {

      const matchingContract = contracts.find(contract => contract.tenant === userId);

      if (matchingContract) {
        propertyId = matchingContract.landlord;
        // console.log('Landlord ID:', propertyId);
        this.router.navigateByUrl(`/admin/manage/properties/${propertyId}`)
        return true;
      } else {
        console.log(`No se encontraron contratos para el usuario con ID: ${ userId }`);
        alert('Este usuario no tiene ningun inmueble contratado.')
        return false;
      }
    });

    return false;
  }

}

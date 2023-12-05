import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { User } from 'src/app/shared/interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Notification } from '../../interfaces/notification.interface';

@Component({
  selector: 'app-notification-page',
  templateUrl: './notification-page.component.html',
  styleUrls: ['./notification-page.component.css']
})
export class NotificationPageComponent implements OnInit, OnDestroy {

  private subscription?: Subscription;
  private subscription2?: Subscription;

  public userList?: User[];

  public notificationForm: FormGroup = this.fb.group({
    title:        ['', [ Validators.required ]],
    description:  ['', [ Validators.required ]],
    userId:       ['', [ Validators.required ]],
  })

  constructor (
    private adminService: AdminService,
    private fb: FormBuilder,
  ){}

  ngOnInit(): void {
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

  onNotification(): boolean{
    if ( this.notificationForm.invalid ) {
      this.notificationForm.markAllAsTouched();
      console.warn('No ha cumplido las validaciones');
      return false;
    }

    const notification = this.notificationForm.value as Notification;

    this.subscription2 = this.adminService.createNotification( notification )
      .subscribe( wasCreated => {
        if ( !wasCreated ){
          alert("Error al crear la notificación");
          console.log(notification);
          return false;
        }

        alert('La notificacion ha sido enviada exitosamente.')
        this.notificationForm.reset();
        return true;
      })

    return false;
  }



  // # Field validations
  isValidField( field: string): boolean | null {
    return this.notificationForm.controls[field].errors
      && this.notificationForm.controls[field].touched;
  }

  getFieldError( field: string ): string | null {
    if ( !this.notificationForm.controls[field] ) return null;

    const errors = this.notificationForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch( key ){
        case "required":
          return `Este campo es requerido`;
      }
    }
    return null;
  }
}

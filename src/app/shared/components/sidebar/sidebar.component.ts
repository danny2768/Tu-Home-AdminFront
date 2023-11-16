import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{

  public currentUser: User | null = null;

  constructor(
    private authService: AuthService,
    private Router: Router,
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.currentUser =  this.authService.currentUser
    }, 350);
  }

  onLogOut(){
    this.authService.logOut();
  }
}

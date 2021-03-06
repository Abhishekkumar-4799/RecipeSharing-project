import {Component, OnDestroy, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,OnDestroy {

  isAuthenticated = false;
  private authSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit(){
    this.authSub = this.authService.user.subscribe(
    (user)=>{this.isAuthenticated = !!user;}
    );
  }

  ngOnDestroy(){
    this.authSub.unsubscribe();
  }

  onLogout(){
    this.authService.logout();
  }

}

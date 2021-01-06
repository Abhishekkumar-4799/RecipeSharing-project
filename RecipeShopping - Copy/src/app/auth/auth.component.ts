import { Component, ComponentFactoryResolver, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService,AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs'
import { Router } from '@angular/router';
import { AlertsComponent } from '../shared/alerts/alerts.component';
import { placeholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy{

  @ViewChild(placeholderDirective) alertHost: placeholderDirective;

  constructor(private auth: AuthService, 
              private router: Router, 
              private componentFactoryResolver: ComponentFactoryResolver) { }

  isLoading = false;
  errMessage='';
  successMessage='';
  authObservable: Observable<AuthResponseData>;
  action='';

  private componentSub: Subscription;

  ngOnDestroy(){
    if(this.componentSub){
      this.componentSub.unsubscribe();
    }  
  }

  onFormSubmit(authForm: NgForm){
    this.errMessage = '';
    this.successMessage='';
    this.action='signup'
    const email = authForm.value.userId;
    const password = authForm.value.password;
    this.isLoading = true;
    this.authObservable = this.auth.signup(email,password)
    this.authSubscribe();
  }

  onSignin(authForm: NgForm){
    this.errMessage = '';
    this.successMessage='';
    this.action='signin'
    const email = authForm.value.userId;
    const password = authForm.value.password;
    this.isLoading = true;
    this.authObservable = this.auth.signin(email,password);
    this.authSubscribe();
  }
  
  private authSubscribe(){
    this.authObservable.subscribe(
      (responseData) => {
        this.isLoading = false; 
        this.successMessage='successfull';
        this.processAction(this.action);
      },
      (errorMessage) => {
        this.isLoading=false; 
        this.errMessage = errorMessage;
        console.log(errorMessage);
        this.showError(errorMessage);
      }
    );
  }

  private processAction(action: string){
    if (action=='signup'){
      this.successMessage='Signup successfull!! login to view recipe';
    } else if(action=='signin') {
      this.router.navigate(['/recipes']);
    } 
  }

  onClose(){
    this.errMessage = '';
  }

  private showError(message: string){
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertsComponent);
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
    componentRef.instance.message = this.errMessage;
    this.componentSub = componentRef.instance.close.subscribe(
      () => {hostViewContainerRef.clear();}
    )
  }
}


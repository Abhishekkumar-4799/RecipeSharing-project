import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate {
    constructor(private authService: AuthService, private router: Router){}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot): 
                boolean| UrlTree | Promise<boolean|UrlTree> | Observable<boolean|UrlTree>{
        const isAuthenticated = !!this.authService.usreToken;
        if ( !isAuthenticated){
            //this.router.navigate(['/auth']);  old way of handling route new way is below
            return this.router.createUrlTree(['/auth']);
        }
        return isAuthenticated;
    }
}
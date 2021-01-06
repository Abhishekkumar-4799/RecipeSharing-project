import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/Operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import {environment} from '../../environments/environment'

export interface AuthResponseData{
    kind:string;
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    displayName?: string;
}

@Injectable({providedIn:'root'})

export class AuthService{
    constructor(private http: HttpClient,private router: Router){}
    
    user = new BehaviorSubject<User>(null);
    usreToken :string = null;
    expirationTimeout: any;

    error = null;
    postUrl: string;
    authObservabe: Observable<AuthResponseData>;

    signup(email:string,password:string){
        this.postUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseApiKey;
        this.authObservabe = this.sendAuthRequest(email,password);
        return this.authObservabe;
    }

    signin(email: string,password: string){
        this.postUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseApiKey;
        this.authObservabe = this.sendAuthRequest(email,password);
        return this.authObservabe;
    }

    logout(){
        this.user.next(null);
    //    this.userLoggedin = false;
        this.usreToken = null;
        localStorage.removeItem('userData');
        if (this.expirationTimeout) {
            clearTimeout(this.expirationTimeout);
        }
        this.expirationTimeout = null;
        this.router.navigate(['/auth']);
    }

    autoLogout(expiryDate: number){
        this.expirationTimeout = setTimeout(() => {
            this.logout();
        }, expiryDate);
    }

    private sendAuthRequest(email:string,password:string)
    {
        return this.http.post<AuthResponseData>(this.postUrl,
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(
                (errorResponse) => {
                    this.handleError(errorResponse);
                    return throwError(this.error);
                }
                
            ),tap(
                (response)=> {
                    const expiryDate = new Date(new Date().getTime() + (+response.expiresIn * 1000)); 
                    const user = new User(response.email,response.localId,response.idToken,expiryDate);
                    this.user.next(user);
                    //this.userLoggedin = true;
                    this.usreToken = user.token;
                    localStorage.setItem('userData',JSON.stringify(user));
                    this.autoLogout(+response.expiresIn * 1000)
                }
            )
        )
    }

    private handleError(errorResponse: HttpErrorResponse){
        this.error = 'An error has occured';
        console.log(errorResponse);
        switch(errorResponse.error.error.message){
            case 'EMAIL_EXISTS':
                this.error = 'Email Already exist';
                break;
            case 'INVALID_PASSWORD':
                this.error = 'Invalid Password: Please try again'
                break;
        }
    }

    autoLogin(){
        const userData : {
            email:string
           ,id: string
           ,_token:string
           ,_expirationDate:string
        } = JSON.parse(localStorage.getItem('userData'));
        if (!userData){
            return;
        }
        const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._expirationDate))
        if (loadedUser.token){
            this.user.next(loadedUser);
            this.usreToken = loadedUser.token;
            const expiryDuration = new Date(userData._expirationDate).getTime() - new Date().getTime()
            this.autoLogout(expiryDuration);

        }
    }

}
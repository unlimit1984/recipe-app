import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { Store } from '@ngrx/store';
import { environment } from '../../environments/environment';

import { User } from './user.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({providedIn: 'root'})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private router: Router,
    private store: Store<fromApp.AppState>) {
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      // 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBirC5_aMPvVIquVNfmEkqZghzFMXUqsIk',
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseAPIKey}`,
      {email: email, password: password, returnSecureToken: true})
      .pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn);
      }));
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      // 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBirC5_aMPvVIquVNfmEkqZghzFMXUqsIk',
      // Option 1
      // 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +environment.firebaseAPIKey,
      // Option 2
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
      {email: email, password: password, returnSecureToken: true})
      .pipe(catchError(this.handleError), tap(resData => {
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn);
      }));
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      // this.user.next(loadedUser);
      this.store.dispatch(new AuthActions.Login({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expirationDate: new Date(userData._tokenExpirationDate)
        })
      );
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
  }

  logout() {
    // this.user.next(null);
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/auth']);
    //localStorage.clear(); //in case of only userData
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    console.log('expirationDuration', expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + 1000 * expiresIn);
    const user = new User(email, userId, token, expirationDate);
    // this.user.next(user);

    // Option 1
    //this.store.dispatch(new AuthActions.Login({email:email, userId: userId, token: token, expirationDate: expirationDate}));
    // Option 2
    this.store.dispatch(
      new AuthActions.Login({
        email,
        userId,
        token,
        expirationDate
      })
    );

    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist.';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'The password in not correct.';
        break;
    }
    return throwError(errorMessage);
  }
}

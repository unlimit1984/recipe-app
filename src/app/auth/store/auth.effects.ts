import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from '../../../environments/environment';
import * as AuthActions from './auth.actions';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$
    .pipe( // this must never die n case of http post error
      ofType(AuthActions.LOGIN_START),
      switchMap((authData: AuthActions.LoginStart, index) => {
        return this.http.post<AuthResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseAPIKey}`,
          {email: authData.payload.email, password: authData.payload.password, returnSecureToken: true})
          .pipe(
            map(resData => {
              const expirationDate = new Date(new Date().getTime() + 1000 * +resData.expiresIn);
              return new AuthActions.Login({
                email: resData.email,
                userId: resData.localId,
                token: resData.idToken,
                expirationDate: expirationDate
              });
            }),
            catchError(errorRes => {
              let errorMessage = 'An unknown error occurred!';
              if (!errorRes.error || !errorRes.error.error) {
                // return throwError(errorMessage);
                return of(new AuthActions.LoginFail(errorMessage));
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
              // return throwError(errorMessage);
              return of(new AuthActions.LoginFail(errorMessage));
            })
          );
      })
    );

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.LOGIN),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,) {
  }
}

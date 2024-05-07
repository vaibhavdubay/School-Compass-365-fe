import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { logInActions } from './action';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { ApiService } from '../service/http.service';
import { LoggedInUser, LoginResponse } from '@sc-models/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectShared } from './selector';
import { CookieService } from '../service/cookie.service';

@Injectable()
export class SharedStoreEffect {
  constructor(
    private action$: Actions,
    private apiService: ApiService,
    private router: Router,
    private store: Store,
    private cookieService: CookieService,
  ) {}

  logIn = createEffect(() => {
    return this.action$.pipe(
      ofType(logInActions.logIn),
      switchMap(({ logDto }) =>
        this.apiService.post<LoginResponse>(`/auth/sign-in`, logDto).pipe(
          map((apiResponse) => {
            this.cookieService.set(
              'authorization',
              `${apiResponse.accessToken}`,
              {
                expires: 86400,
                sameSite: 'Strict',
                secure: true,
                path: '/',
              },
            );
            return logInActions.logInSuccess({ response: apiResponse });
          }),
        ),
      ),
    );
  });

  logInSuccess = createEffect(
    () => {
      return this.action$.pipe(
        ofType(logInActions.logInSuccess),
        tap(({ response }) => {
          const { user, school, ...userProfile } = response.userProfile;
          const role = user.role;
          sessionStorage.setItem('user', atob(JSON.stringify(userProfile)));
          this.router.navigate([role, 'dashboard']);
        }),
      );
    },
    { dispatch: false },
  );

  userProfile = createEffect(() => {
    return this.action$.pipe(
      ofType(logInActions.userProfile),
      concatLatestFrom(() => this.store.select(selectShared)),
      filter((action) => !action[1].loggedInUser),
      switchMap(() =>
        this.apiService.get<LoggedInUser>(`/auth/profile`).pipe(
          map((response) => logInActions.userProfileSuccess({ response })),
          catchError((error) => of(logInActions.userProfileFailure({ error }))),
        ),
      ),
    );
  });
  userProfileSuccess = createEffect(
    () => {
      return this.action$.pipe(
        ofType(logInActions.userProfileSuccess),
        tap(({ response }) => {
          const { user, school, ...userProfile } = response;
          // const role = user.role;
          sessionStorage.setItem('user', btoa(JSON.stringify(userProfile)));
          // this.router.navigate([role, 'dashboard']);
        }),
      );
    },
    { dispatch: false },
  );

  userProfileFailure = createEffect(
    () => {
      return this.action$.pipe(
        ofType(logInActions.userProfileFailure),
        tap(() => {
          if (typeof window !== 'undefined') {
            localStorage.clear();
            sessionStorage.clear();
          }
          this.cookieService.deleteAll();
          this.router.navigate(['']);
        }),
      );
    },
    { dispatch: false },
  );

  logOut = createEffect(
    () => {
      return this.action$.pipe(
        ofType(logInActions.logOut),
        tap(() => {
          if (typeof window !== 'undefined') {
            localStorage.clear();
            sessionStorage.clear();
          }
          this.cookieService.deleteAll();
          this.router.navigate(['']);
        }),
      );
    },
    { dispatch: false },
  );
}

import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { logInActions } from './action';
import { catchError, filter, map, of, switchMap, tap } from 'rxjs';
import { ApiService } from '../service/http.service';
import { LoggedInUser, LoginResponse, UserProfile } from '@sc-models/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from '../service/cookie.service';
import { initAdminState } from '@sc-modules/admin/state/action';
import { Role } from '@sc-enums/role';
import { initStudentState } from '@sc-modules/students/state/action';
import { initTeacherState } from '@sc-modules/teachers/state/action';
import { selectLoggedInUser } from './selector';

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
        map(({ response }) => {
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          const { user, school, ...userProfile } = response.userProfile;
          const role = user.role;
          this.router.navigate([role, 'dashboard']);
          return this.handleFeatureState(user.role, userProfile);
        }),
      );
    },
    // { dispatch: false },
  );

  userProfile = createEffect(() => {
    return this.action$.pipe(
      ofType(logInActions.userProfile),
      concatLatestFrom(() => this.store.select(selectLoggedInUser)),
      filter((action) => !action[1]),
      switchMap(() =>
        this.apiService.get<LoggedInUser>(`/auth/profile`).pipe(
          map((response) => logInActions.userProfileSuccess({ response })),
          catchError((error) => of(logInActions.userProfileFailure({ error }))),
        ),
      ),
    );
  });
  userProfileSuccess = createEffect(() => {
    return this.action$.pipe(
      ofType(logInActions.userProfileSuccess),
      map(({ response }) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { user, school, ...userProfile } = response;
        return this.handleFeatureState(user.role, userProfile);
      }),
    );
  });

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

  private handleFeatureState(role: Role, userProfile: UserProfile) {
    switch (role) {
      case Role.ADMIN:
        return initAdminState({ adminProfile: userProfile });
      case Role.TEACHER:
        return initTeacherState({ teacherProfile: userProfile });
      case Role.STUDENT:
        return initStudentState({ studentProfile: userProfile });
    }
  }
}

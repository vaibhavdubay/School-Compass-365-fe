import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { concatLatestFrom } from '@ngrx/operators';
import { ApiService } from 'src/app/core/service/http.service';
import { classes as classAction, school as schoolActions } from './action';
import { catchError, filter, map, of, switchMap } from 'rxjs';
import { Class, SchoolProfile } from '@sc-models/core';
import { apiRoutes } from 'src/app/core/constants/api.constants';
import { selectClasses } from './selector';
import { AdminService } from '../services/admin.service';

@Injectable()
export class AdminEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private store: AdminService,
  ) {}

  getAllClasses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(classAction.getAll),
      concatLatestFrom(() => this.store.select(selectClasses)),
      filter(([_, classes]) => !classes?.length),
      switchMap(() =>
        this.apiService.get<Class[]>(apiRoutes.class.get).pipe(
          map((classes) => classAction.getAllSuccess({ classes })),
          catchError((err) => of(classAction.getAllFailure({ error: err }))),
        ),
      ),
    );
  });
  updateSchoolProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(schoolActions.updateSchool),
      switchMap(({ school }) =>
        this.apiService
          .put<SchoolProfile>(
            apiRoutes.school.update(school.id as string),
            school,
          )
          .pipe(
            map((school) => schoolActions.updateSchoolSuccess({ school })),
            catchError((err) =>
              of(schoolActions.updateSchoolFailure({ error: err })),
            ),
          ),
      ),
    );
  });
}

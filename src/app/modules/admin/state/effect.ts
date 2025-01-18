import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ApiService } from 'src/app/core/service/http.service';
import { adminActions, classes as classAction, school as schoolActions, teachersAction } from './action';
import { catchError, filter, map, of, switchMap, tap, withLatestFrom } from 'rxjs';
import { AdminUser, Class, SchoolProfile, TeacherProfile } from '@sc-models/core';
import { apiRoutes } from 'src/app/core/constants/api.constants';
import { selectClasses, selectTeachers } from './selector';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Injectable()
export class AdminEffects {
  private readonly actions$ = inject(Actions);
  private readonly apiService = inject(ApiService);
  private readonly store = inject(AdminService);
  private readonly router = inject(Router);

  getAllClasses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(classAction.getAll),
      withLatestFrom(this.store.select(selectClasses)),
      filter(([_, classes]) => !classes?.length),
      switchMap(() =>
        this.apiService.get<Class[]>(apiRoutes.class.get).pipe(
          map((classes) => classAction.getAllSuccess({ classes })),
          catchError((err) => of(classAction.getAllFailure({ error: err }))),
        ),
      ),
    );
  });
  getAllTeachers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(teachersAction.getAllTeachers),
      withLatestFrom(this.store.select(selectTeachers)),
      filter(([_, teachers]) => !teachers?.length),
      switchMap(() =>
        this.apiService.get<TeacherProfile[]>(apiRoutes.teachers.get).pipe(
          map((teachers) => teachersAction.getAllTeachersSuccess({ teachers })),
          catchError((err) => of(teachersAction.getAllTeachersFailure({ error: err }))),
        ),
      ),
    );
  });
  createTeacher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(teachersAction.createTeacher),
      switchMap(({ teacher }) =>
        this.apiService.post<TeacherProfile>(apiRoutes.teachers.create, teacher).pipe(
          map((teacher) => teachersAction.createTeacherSuccess({ teacher })),
          catchError((err) => of(teachersAction.createTeacherFailure({ error: err }))),
        ),
      ),
    );
  });

  createTeacherSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(teachersAction.createTeacherSuccess),
      tap(() => {
        this.router.navigate(['admin','teachers']);
      }),
    )
  }, { dispatch: false });
  updateTeacher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(teachersAction.updateTeacher),
      switchMap(({ teacher, id }) =>
        this.apiService.put<TeacherProfile>(apiRoutes.teachers.update(id), teacher).pipe(
          map((teacher) => teachersAction.updateTeacherSuccess({ teacher })),
          catchError((err) => of(teachersAction.updateTeacherFailure({ error: err }))),
        ),
      ),
    );
  });
  deleteTeacher$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(teachersAction.deleteTeacher),
      switchMap(({ id }) =>
        this.apiService.delete<TeacherProfile>(apiRoutes.teachers.delete(id)).pipe(
          map(() => teachersAction.deleteTeacherSuccess({ id })),
          catchError((err) => of(teachersAction.deleteTeacherFailure({ error: err }))),
        ),
      ),
    );
  });

  updateSchoolProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(schoolActions.updateSchool),
      switchMap(({ school }) =>
        this.apiService.put<SchoolProfile>(apiRoutes.school.update(school.id as string), school).pipe(
          map((school) => schoolActions.updateSchoolSuccess({ school })),
          catchError((err) => of(schoolActions.updateSchoolFailure({ error: err }))),
        ),
      ),
    );
  });

  updateAdminProfile$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(adminActions.updateAdmin),
      switchMap(({ adminUser }) =>
        this.apiService.put<AdminUser>(apiRoutes.admin.update(adminUser.id as string), adminUser).pipe(
          map((adminUser) => adminActions.updateAdminSuccess({ adminUser })),
          catchError((err) => of(adminActions.updateAdminFailure({ error: err }))),
        ),
      ),
    );
  });
}

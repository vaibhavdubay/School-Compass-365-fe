import { Injectable, inject } from '@angular/core';
import { StoreService } from 'src/app/core/service/store.service';
import { AdminState } from '../state/reducer';
import { Store } from '@ngrx/store';
import { selectAdminUser, selectClasses, selectTeachers } from '../state/selector';
import { adminActions, classes, teachersAction } from '../state/action';
import { filter } from 'rxjs';
import { AdminUser, CreateTeacherProfile } from '@sc-models/core';

@Injectable()
export class AdminService extends StoreService<AdminState> {
  constructor() {
    const store = inject(Store);

    super(store);
  }

  get adminUser$() {
    return this.select(selectAdminUser).pipe(filter((a) => !!a));
  }
  get classes$() {
    this.dispatch(classes.getAll());
    return this.select(selectClasses).pipe(filter((c) => !!c));
  }
  get teachers$() {
    this.dispatch(teachersAction.getAllTeachers())
    return this.select(selectTeachers).pipe(filter((c) => !!c))
  }
  createTeachersProfile(teacher: CreateTeacherProfile) {
    this.dispatch(teachersAction.createTeacher({ teacher }));
  }
  updateAdminUserProfile(adminUser: AdminUser) {
    this.dispatch(adminActions.updateAdmin({ adminUser }));
  }
}

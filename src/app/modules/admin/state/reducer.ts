import { createReducer, on } from '@ngrx/store';
import { AdminUser, Class, Nullable, SchoolProfile } from '@sc-models/core';
import { initAdminState } from './action';
import { classes as classAction, school as schoolAction } from './action';

export interface AdminState {
  adminUser: AdminUser;
  classes: Class[];
  schoolProfile: SchoolProfile;
}

export const initialState: Nullable<AdminState> = {
  adminUser: null,
  classes: null,
  schoolProfile: null,
};

export const AdminReducer = createReducer<AdminState>(
  initialState as AdminState,
  on(initAdminState, (state, action) => ({
    ...state,
    adminUser: action.adminProfile,
  })),
  on(classAction.getAllSuccess, (state, action) => ({
    ...state,
    classes: action.classes,
  })),
  on(schoolAction.updateSchoolSuccess, (state, action) => {
    console.log(action);
    return {
      ...state,
      schoolProfile: action.school,
    };
  }),
);

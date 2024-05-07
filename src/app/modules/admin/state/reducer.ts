import { createReducer, on } from '@ngrx/store';
import { AdminUser, Nullable } from '@sc-models/core';
import { initAdminState } from './action';

export interface AdminState {
  adminUser: AdminUser;
}

export const initialState: Nullable<AdminState> = {
  adminUser: null,
};

export const AdminReducer = createReducer(
  initialState,
  on(
    initAdminState,
    (state, action): AdminState => ({
      ...state,
      adminUser: action.adminProfile,
    }),
  ),
);

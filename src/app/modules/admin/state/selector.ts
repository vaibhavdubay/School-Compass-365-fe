import { createFeatureSelector, createSelector } from '@ngrx/store';
import { STORE_FEATURES } from '@sc-enums/store';
import { AdminState } from './reducer';

const selectAdminState = createFeatureSelector<AdminState>(
  STORE_FEATURES.ADMIN,
);

export const selectAdminUser = createSelector(
  selectAdminState,
  (state) => state.adminUser,
);

export const selectClasses = createSelector(
  selectAdminState,
  (state) => state.classes,
);

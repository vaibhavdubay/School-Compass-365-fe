import { createAction, props } from '@ngrx/store';
import { AdminUser } from '@sc-models/core';

export const initAdminState = createAction(
  '[ADMIN] Initiate State',
  props<{ adminProfile: AdminUser }>(),
);

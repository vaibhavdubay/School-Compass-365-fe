import { createAction, props } from '@ngrx/store';
import { TeacherProfile } from '@sc-models/core';

export const initTeacherState = createAction(
  '[TEACHER] Initiate State',
  props<{ teacherProfile: TeacherProfile }>(),
);

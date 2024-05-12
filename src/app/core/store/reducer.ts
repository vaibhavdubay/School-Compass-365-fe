import { createReducer, on } from '@ngrx/store';
import { Nullable, SchoolProfile, User } from '@sc-models/core';
import { logInActions } from './action';

export interface SharedState {
  loggedInUser: User;
  schoolProfile: SchoolProfile;
}

export const initialState: Nullable<SharedState> = {
  loggedInUser: null,
  schoolProfile: null,
};

export const SharedStoreReducer = createReducer(
  initialState,
  on(
    logInActions.logInSuccess,
    (state, action): SharedState => ({
      ...state,
      loggedInUser: {
        ...action.response.userProfile.user,
        profileImageUrl: action.response.userProfile.profileImageUrl,
      },
      schoolProfile: action.response.userProfile.school,
    }),
  ),
  on(
    logInActions.userProfileSuccess,
    (state, action): SharedState => ({
      ...state,
      loggedInUser: {
        ...action.response.user,
        profileImageUrl: action.response.profileImageUrl,
      },
      schoolProfile: action.response.school,
    }),
  ),
  on(logInActions.logOut, () => ({
    ...initialState,
  })),
);

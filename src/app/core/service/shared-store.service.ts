import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreService } from 'src/app/core/service/store.service';
import { SharedState } from '../store/reducer';
import {
  selectLoggedInUser,
  selectLoggedInUserWithSchool,
  selectSchoolProfile,
} from '../store/selector';
import { logInActions } from '../store/action';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedStoreService extends StoreService<SharedState> {
  constructor(store: Store) {
    super(store);
  }

  get loggedInUserWithSchool$() {
    this.dispatch(logInActions.userProfile());
    return this.select(selectLoggedInUserWithSchool).pipe(
      filter(
        ({ schoolProfile, loggedInUser }) => !!schoolProfile && !!loggedInUser,
      ),
    );
  }

  get School$() {
    this.dispatch(logInActions.userProfile());
    return this.select(selectSchoolProfile).pipe(
      filter((schoolProfile) => !!schoolProfile),
    );
  }

  get loggedInUser$() {
    this.dispatch(logInActions.userProfile());
    return this.select(selectLoggedInUser).pipe(
      filter((loggedInUser) => !!loggedInUser),
    );
  }
}

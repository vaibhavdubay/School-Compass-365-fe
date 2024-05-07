import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { StoreService } from 'src/app/core/service/store.service';
import { SharedState } from '../store/reducer';
import { selectShared } from '../store/selector';
import { logInActions } from '../store/action';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedStoreService extends StoreService<SharedState> {
  constructor(store: Store) {
    super(store);
  }

  get loggedInUser$() {
    this.dispatch(logInActions.userProfile());
    return this.select(selectShared).pipe(
      filter(
        ({ schoolProfile, loggedInUser }) => !!schoolProfile && !!loggedInUser,
      ),
    );
  }
}

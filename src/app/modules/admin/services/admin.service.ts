import { Injectable } from '@angular/core';
import { StoreService } from 'src/app/core/service/store.service';
import { AdminState } from '../state/reducer';
import { Store } from '@ngrx/store';
import { selectAdminUser, selectClasses } from '../state/selector';
import { classes } from '../state/action';
import { filter } from 'rxjs';

@Injectable()
export class AdminService extends StoreService<AdminState> {
  constructor(store: Store) {
    super(store);
  }

  get adminUser$() {
    return this.select(selectAdminUser).pipe(filter((a) => !!a));
  }
  get classes$() {
    this.dispatch(classes.getAll());
    return this.select(selectClasses).pipe(filter((c) => !!c));
  }
}

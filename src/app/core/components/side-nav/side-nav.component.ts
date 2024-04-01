import { Component, Input, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { LoggedInUser, NavItem } from '@sc-models/core';
import { SharedStoreService } from '../../service/shared-store.service';
import { logInActions } from '../../store/action';

@Component({
  selector: 'sc-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
})
export class SideNavComponent {
  profile: Observable<LoggedInUser>;
  private breakpointObserver = inject(BreakpointObserver);
  constructor(private sharedStore: SharedStoreService) {
    this.profile = this.sharedStore.loggedInUser$;
  }
  @Input({ required: true }) naveItem: NavItem[] = [];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay(),
    );

  logOut() {
    this.sharedStore.dispatch(logInActions.logOut());
  }
}

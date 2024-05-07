import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, inject } from '@angular/core';
import { NavItem } from '@sc-models/core';
import { Observable, map, shareReplay } from 'rxjs';
import { SharedStoreService } from '../../service/shared-store.service';
import { logInActions } from '../../store/action';
import { ScreenSizeObserver } from '../../service/screen.service';
import { SharedState } from '../../store/reducer';

@Component({
  selector: 'sc-layout',
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  @Input({ required: true }) navItems: NavItem[] = [];

  private breakpointObserver = inject(BreakpointObserver);
  profile: Observable<SharedState>;
  constructor(
    private sharedStore: SharedStoreService,
    public readonly screenObserver: ScreenSizeObserver,
  ) {
    this.profile = this.sharedStore.loggedInUserWithSchool$;
  }

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

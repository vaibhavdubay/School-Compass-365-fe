import { Component } from '@angular/core';
import { sideNavConfig } from '@sc-modules/admin/constants/admin.constant';

@Component({
  selector: 'sc-admin-main',
  template: `
    <sc-layout [navItems]="navConfig">
      <router-outlet></router-outlet>
    </sc-layout>
  `,
})
export class AdminMainComponent {
  navConfig = sideNavConfig;
}

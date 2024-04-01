import { Component } from '@angular/core';
import { sideNavConfig } from '@sc-modules/admin/constants/admin.constant';

@Component({
  selector: 'sc-admin-main',
  template: `
    <sc-side-nav [naveItem]="navConfig">
      <router-outlet></router-outlet>
    </sc-side-nav>
  `,
})
export class AdminMainComponent {
  navConfig = sideNavConfig;
}

import { Component, Input } from '@angular/core';
import { NavItem } from '@sc-models/core';
import { ScreenSizeObserver } from '../../service/screen.service';

@Component({
  selector: 'sc-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  @Input({ required: true }) navItems: NavItem[] = [];
  constructor(public readonly screenObserver: ScreenSizeObserver) {}
}

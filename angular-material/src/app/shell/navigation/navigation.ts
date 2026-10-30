import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

const NAV_ITEMS = [
  { label: 'Overview', icon: 'dashboard', href: '#overview', active: true },
  { label: 'Analytics', icon: 'monitoring', href: '#analytics', active: false },
  { label: 'Projects', icon: 'view_list', href: '#projects', active: false },
  { label: 'Team', icon: 'groups', href: '#team', active: false },
] as const;

@Component({
  imports: [MatButtonModule, MatChipsModule, MatIconModule, MatTooltipModule],
  selector: 'app-navigation',
  styleUrls: ['./navigation.scss', './navigation-note.scss'],
  templateUrl: './navigation.html',
})
export class NavigationComponent {
  readonly mobile = input(false);
  readonly navigate = output<void>();
  protected readonly navItems = NAV_ITEMS;
}

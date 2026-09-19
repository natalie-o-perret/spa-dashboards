import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { NAV_ITEMS } from '../app.data';

@Component({
  imports: [MatButtonModule, MatChipsModule, MatIconModule],
  selector: 'app-navigation',
  styleUrls: ['./navigation.scss', './navigation-note.scss'],
  templateUrl: './navigation.html',
})
export class NavigationComponent {
  readonly mobile = input(false);
  readonly navigate = output<void>();
  protected readonly navItems = NAV_ITEMS;
}

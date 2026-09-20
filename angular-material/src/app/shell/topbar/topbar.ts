import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatTooltipModule],
  selector: 'app-topbar',
  styleUrls: ['./topbar.scss', './topbar-responsive.scss'],
  templateUrl: './topbar.html',
})
export class TopbarComponent {
  readonly darkTheme = input.required<boolean>();
  readonly drawerOpen = input.required<boolean>();
  readonly openNavigation = output<void>();
  readonly toggleTheme = output<void>();
}

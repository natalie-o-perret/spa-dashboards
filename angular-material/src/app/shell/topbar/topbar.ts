import { Component, computed, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';

export type ThemePreference = 'light' | 'dark' | 'system';

@Component({
  imports: [MatButtonModule, MatIconModule, MatToolbarModule, MatTooltipModule],
  selector: 'app-topbar',
  styleUrls: ['./topbar.scss', './topbar-responsive.scss'],
  templateUrl: './topbar.html',
})
export class TopbarComponent {
  readonly themePreference = input.required<ThemePreference>();
  readonly themes = [
    { value: 'light', label: 'Light', icon: 'light_mode' },
    { value: 'dark', label: 'Dark', icon: 'dark_mode' },
    { value: 'system', label: 'System', icon: 'desktop_windows' },
  ] as const;
  readonly currentTheme = computed(() =>
    this.themes.find((theme) => theme.value === this.themePreference())!,
  );
  readonly nextTheme = computed(
    () => this.themes[(this.themes.indexOf(this.currentTheme()) + 1) % this.themes.length],
  );
  readonly themeActionLabel = computed(
    () =>
      `Theme: ${this.currentTheme().label}. Switch to ${this.nextTheme().label.toLowerCase()} theme`,
  );
  readonly drawerOpen = input.required<boolean>();
  readonly openNavigation = output<void>();
  readonly themeChange = output<ThemePreference>();
}

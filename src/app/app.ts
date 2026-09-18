import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  ACTIVITY,
  INITIATIVES,
  METRICS,
  NAV_ITEMS,
  SCHEDULE,
  TREND_AREA,
  TREND_LINE,
  TREND_POINTS,
} from './app.data';

const THEME_STORAGE_KEY = 'northstar-theme';

@Component({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatSidenavModule,
    MatTooltipModule,
    NgTemplateOutlet,
  ],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  private readonly document = inject(DOCUMENT);
  private readonly storage = this.getStorage();

  protected readonly activity = ACTIVITY;
  protected readonly darkTheme = signal(this.getInitialTheme());
  protected readonly initiatives = INITIATIVES;
  protected readonly metrics = METRICS;
  protected readonly navItems = NAV_ITEMS;
  protected readonly schedule = SCHEDULE;
  protected readonly trendArea = TREND_AREA;
  protected readonly trendLine = TREND_LINE;
  protected readonly trendPoints = TREND_POINTS;

  constructor() {
    this.applyTheme(this.darkTheme());

    effect(() => {
      const dark = this.darkTheme();
      this.applyTheme(dark);

      try {
        this.storage?.setItem(THEME_STORAGE_KEY, dark ? 'dark' : 'light');
      } catch {
        // Browsers can disable storage while still exposing the API.
      }
    });
  }

  protected toggleTheme(): void {
    this.darkTheme.update((dark) => !dark);
  }

  private applyTheme(dark: boolean): void {
    this.document.documentElement.classList.toggle('dark-theme', dark);
    this.document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
  }

  private getInitialTheme(): boolean {
    try {
      const savedTheme = this.storage?.getItem(THEME_STORAGE_KEY);
      if (savedTheme) {
        return savedTheme === 'dark';
      }

      return (
        this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches ?? false
      );
    } catch {
      return false;
    }
  }

  private getStorage(): Storage | null {
    try {
      return this.document.defaultView?.localStorage ?? null;
    } catch {
      return null;
    }
  }
}

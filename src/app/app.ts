import { DOCUMENT } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ViewChild,
  effect,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { AnalyticsComponent } from './analytics/analytics';
import { NavigationComponent } from './navigation/navigation';
import { OverviewComponent } from './overview/overview';
import { ProjectsComponent } from './projects/projects';
import { TopbarComponent } from './topbar/topbar';

const THEME_STORAGE_KEY = 'meridian-theme';

@Component({
  imports: [
    AnalyticsComponent,
    MatSidenavModule,
    NavigationComponent,
    OverviewComponent,
    ProjectsComponent,
    TopbarComponent,
  ],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App implements AfterViewInit {
  private readonly breakpointObserver = inject(BreakpointObserver);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly storage = this.getStorage();

  @ViewChild('drawer') protected drawer!: MatSidenav;
  protected readonly darkTheme = signal(this.getInitialTheme());

  constructor() {
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

  ngAfterViewInit(): void {
    this.breakpointObserver
      .observe('(min-width: 960px)')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ matches }) => {
        if (matches && this.drawer.opened) void this.drawer.close();
      });
  }

  protected toggleTheme(): void {
    this.darkTheme.update((dark) => !dark);
  }

  private applyTheme(dark: boolean): void {
    this.document.documentElement.classList.toggle('dark-theme', dark);
    this.document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    this.document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', dark ? '#0f141d' : '#f5f7fa');
  }

  private getInitialTheme(): boolean {
    try {
      const saved = this.storage?.getItem(THEME_STORAGE_KEY);
      return saved
        ? saved === 'dark'
        : (this.document.defaultView?.matchMedia?.('(prefers-color-scheme: dark)').matches ??
            false);
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

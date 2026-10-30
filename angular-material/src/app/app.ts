import { DOCUMENT } from '@angular/common';
import { BreakpointObserver } from '@angular/cdk/layout';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  ViewChild,
  effect,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { AnalyticsComponent } from './features/portfolio/analytics/analytics';
import { OverviewComponent } from './features/portfolio/overview/overview';
import { ProjectsComponent } from './features/projects/projects';
import { NavigationComponent } from './shell/navigation/navigation';
import { TopbarComponent, type ThemePreference } from './shell/topbar/topbar';

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
  private readonly systemTheme = this.document.defaultView?.matchMedia?.(
    '(prefers-color-scheme: dark)',
  );
  private readonly systemDark = signal(this.systemTheme?.matches ?? false);

  @ViewChild('drawer') protected drawer!: MatSidenav;
  protected readonly themePreference = signal<ThemePreference>(this.getInitialTheme());
  protected readonly darkTheme = computed(() =>
    this.themePreference() === 'system' ? this.systemDark() : this.themePreference() === 'dark',
  );

  constructor() {
    const updateSystemTheme = (event: MediaQueryListEvent) => this.systemDark.set(event.matches);
    this.systemTheme?.addEventListener('change', updateSystemTheme);
    this.destroyRef.onDestroy(() =>
      this.systemTheme?.removeEventListener('change', updateSystemTheme),
    );
    effect(() => {
      const dark = this.darkTheme();
      this.applyTheme(dark);
      try {
        this.storage?.setItem(THEME_STORAGE_KEY, this.themePreference());
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

  private applyTheme(dark: boolean): void {
    this.document.documentElement.classList.toggle('dark-theme', dark);
    this.document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    this.document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute('content', dark ? '#0d0e10' : '#fff5f6');
  }

  private getInitialTheme(): ThemePreference {
    try {
      const saved = this.storage?.getItem(THEME_STORAGE_KEY);
      if (saved === 'light' || saved === 'dark' || saved === 'system') return saved;
    } catch {
      // Storage is optional. System preference remains available without it.
    }
    return 'system';
  }

  private getStorage(): Storage | null {
    try {
      return this.document.defaultView?.localStorage ?? null;
    } catch {
      return null;
    }
  }
}

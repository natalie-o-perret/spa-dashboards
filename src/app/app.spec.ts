import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App theme preference', () => {
  let storage: Storage;

  beforeEach(async () => {
    const values = new Map<string, string>();
    storage = {
      get length() {
        return values.size;
      },
      clear: () => values.clear(),
      getItem: (key) => values.get(key) ?? null,
      key: (index) => [...values.keys()][index] ?? null,
      removeItem: (key) => void values.delete(key),
      setItem: (key, value) => values.set(key, value),
    };
    Object.defineProperty(document.defaultView, 'localStorage', {
      configurable: true,
      value: storage,
    });
    document.documentElement.classList.remove('dark-theme');
    document.documentElement.style.removeProperty('color-scheme');

    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('loads a saved theme and persists the next choice', async () => {
    storage.setItem('northstar-theme', 'dark');

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    const toggle = fixture.nativeElement.querySelector(
      '[data-testid="theme-toggle"]',
    ) as HTMLButtonElement;

    expect(document.documentElement.classList.contains('dark-theme')).toBe(true);
    expect(toggle.getAttribute('aria-label')).toBe('Use light theme');

    toggle.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(storage.getItem('northstar-theme')).toBe('light');
    expect(document.documentElement.classList.contains('dark-theme')).toBe(false);
    expect(toggle.getAttribute('aria-label')).toBe('Use dark theme');
  });
});

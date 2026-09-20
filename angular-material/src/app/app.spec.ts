import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { TestBed } from '@angular/core/testing';
import { ReplaySubject } from 'rxjs';
import { App } from './app';

describe('App', () => {
  let storage: Storage;
  let breakpoint: ReplaySubject<BreakpointState>;

  afterEach(() => vi.restoreAllMocks());

  beforeEach(async () => {
    breakpoint = new ReplaySubject<BreakpointState>(1);
    breakpoint.next({ matches: false, breakpoints: { '(min-width: 960px)': false } });
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
      providers: [
        {
          provide: BreakpointObserver,
          useValue: { observe: () => breakpoint.asObservable() },
        },
      ],
    }).compileComponents();
  });

  it('searches displayed fields but not hidden project IDs', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    const search = fixture.nativeElement.querySelector(
      '[data-testid="project-search"]',
    ) as HTMLInputElement;
    search.value = 'Beacon research';
    search.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    const rows = [
      ...fixture.nativeElement.querySelectorAll('tr.mat-mdc-row:not(.no-results-row)'),
    ] as HTMLElement[];
    expect(rows).toHaveLength(1);
    expect(rows[0].textContent).toContain('Beacon research hub');
    expect(rows[0].textContent).toContain('Theo Martin');

    search.value = '13';
    search.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    await fixture.whenStable();

    expect(
      fixture.nativeElement.querySelectorAll('tr.mat-mdc-row:not(.no-results-row)'),
    ).toHaveLength(0);
    expect(fixture.nativeElement.querySelector('.no-results-row')?.textContent).toContain(
      'No projects match your current search and status filters.',
    );
    expect(
      (fixture.nativeElement.querySelector('.export-button') as HTMLButtonElement).disabled,
    ).toBe(true);
  });

  it('exports every filtered and sorted row with the shared CSV bytes', async () => {
    let exportedBlob: Blob | undefined;
    vi.spyOn(URL, 'createObjectURL').mockImplementation((blob) => {
      exportedBlob = blob as Blob;
      return 'blob:meridian-projects';
    });
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => undefined);

    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    const search = fixture.nativeElement.querySelector(
      '[data-testid="project-search"]',
    ) as HTMLInputElement;
    search.value = 'High';
    search.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const projectSort = fixture.nativeElement.querySelector(
      'th.mat-column-name .mat-sort-header-container',
    ) as HTMLElement;
    projectSort.click();
    projectSort.click();
    fixture.detectChanges();
    await fixture.whenStable();

    (fixture.nativeElement.querySelector('.export-button') as HTMLButtonElement).click();
    const csv = await exportedBlob?.text();
    const lines = csv?.split('\r\n');

    expect(lines).toHaveLength(7);
    expect(lines?.[0]).toBe(
      '"ID","Project","Owner","Status","Priority","Progress","Due date","Budget"',
    );
    expect(lines?.[1]).toBe(
      '"17","Quartz search relevance","Mae Wilson","At risk","High","49%","2026-10-18","58000"',
    );
    expect(lines?.[6]).toBe(
      '"1","Aurora mobile refresh","Maya Chen","On track","High","82%","2026-09-24","48000"',
    );
  });

  it('closes the temporary drawer when the desktop breakpoint matches', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    (fixture.nativeElement.querySelector('.menu-button') as HTMLButtonElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    const drawer = fixture.nativeElement.querySelector('#mobile-navigation') as HTMLElement;
    expect(drawer.classList.contains('mat-drawer-opened')).toBe(true);

    breakpoint.next({ matches: true, breakpoints: { '(min-width: 960px)': true } });
    fixture.detectChanges();
    await fixture.whenStable();

    expect(drawer.classList.contains('mat-drawer-opened')).toBe(false);
    expect(
      fixture.nativeElement
        .querySelector('.mat-drawer-backdrop')
        ?.classList.contains('mat-drawer-shown'),
    ).toBe(false);

    fixture.destroy();
  });

  it('loads and updates the saved theme', async () => {
    storage.setItem('meridian-theme', 'dark');
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();

    const toggle = fixture.nativeElement.querySelector(
      '[data-testid="theme-toggle"]',
    ) as HTMLButtonElement;
    expect(document.documentElement.classList.contains('dark-theme')).toBe(true);

    toggle.click();
    fixture.detectChanges();
    await fixture.whenStable();

    expect(storage.getItem('meridian-theme')).toBe('light');
    expect(toggle.getAttribute('aria-label')).toBe('Use dark theme');
  });
});

import { DOCUMENT, NgTemplateOutlet } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
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
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleChange, MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  METRICS,
  NAV_ITEMS,
  PROJECTS,
  Project,
  ProjectStatus,
  TEAM_CAPACITY,
  TREND_AREA,
  TREND_LINE,
  TREND_POINTS,
} from './app.data';

const THEME_STORAGE_KEY = 'meridian-theme';
const DESKTOP_BREAKPOINT = '(min-width: 960px)';
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const NUMBER_FORMATTER = new Intl.NumberFormat('en-IE');

type StatusFilter = 'All statuses' | ProjectStatus;
type Density = 'comfortable' | 'compact';

interface TableFilter {
  search: string;
  status: StatusFilter;
}

function csvCell(value: string | number): string {
  return `"${String(value).replaceAll('"', '""')}"`;
}

@Component({
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    NgTemplateOutlet,
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

  @ViewChild('drawer') private drawer!: MatSidenav;
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  @ViewChild(MatSort) private sort!: MatSort;

  protected readonly darkTheme = signal(this.getInitialTheme());
  protected readonly dataSource = new MatTableDataSource<Project>([...PROJECTS]);
  protected readonly displayedColumns = [
    'select',
    'name',
    'owner',
    'status',
    'priority',
    'progress',
    'due',
    'budget',
  ];
  protected readonly metrics = METRICS;
  protected readonly navItems = NAV_ITEMS;
  protected readonly selection = new SelectionModel<Project>(true);
  protected readonly statusOptions: readonly StatusFilter[] = [
    'All statuses',
    'On track',
    'At risk',
    'Blocked',
    'Complete',
  ];
  protected readonly teamCapacity = TEAM_CAPACITY;
  protected readonly trendArea = TREND_AREA;
  protected readonly trendLine = TREND_LINE;
  protected readonly trendPoints = TREND_POINTS;

  protected density: Density = 'comfortable';
  protected pageSize = 5;
  protected searchQuery = '';
  protected statusFilter: StatusFilter = 'All statuses';

  constructor() {
    this.dataSource.filterPredicate = (project, rawFilter) => {
      const filter = JSON.parse(rawFilter) as TableFilter;
      const matchesStatus = filter.status === 'All statuses' || project.status === filter.status;
      const searchable = [
        project.name,
        project.owner,
        project.status,
        project.priority,
        project.progress,
        `${project.progress}%`,
        project.due,
        this.formatDate(project.due),
        project.budget,
        this.formatBudget(project.budget),
      ]
        .join(' ')
        .toLowerCase();

      return matchesStatus && searchable.includes(filter.search);
    };

    this.dataSource.sortingDataAccessor = (project, column) => {
      switch (column) {
        case 'name':
          return project.name;
        case 'owner':
          return project.owner;
        case 'status':
          return project.status;
        case 'priority':
          return project.priority;
        case 'progress':
          return project.progress;
        case 'due':
          return project.due;
        case 'budget':
          return project.budget;
        default:
          return project.id;
      }
    };

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

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.breakpointObserver
      .observe(DESKTOP_BREAKPOINT)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(({ matches }) => {
        if (matches && this.drawer.opened) {
          void this.drawer.close();
        }
      });
  }

  protected toggleTheme(): void {
    this.darkTheme.update((dark) => !dark);
  }

  protected onSearch(event: Event): void {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }

  protected onStatusChange(event: MatSelectChange): void {
    this.statusFilter = event.value as StatusFilter;
    this.applyFilters();
  }

  protected clearFilters(): void {
    this.searchQuery = '';
    this.statusFilter = 'All statuses';
    this.applyFilters();
  }

  protected onPageChange(event: PageEvent): void {
    if (event.pageSize !== this.pageSize) {
      this.pageSize = event.pageSize;
      this.paginator.firstPage();
    }
  }

  protected onDensityChange(event: MatButtonToggleChange): void {
    this.density = event.value as Density;
  }

  protected isAllVisibleSelected(): boolean {
    const rows = this.visibleRows();
    return rows.length > 0 && rows.every((row) => this.selection.isSelected(row));
  }

  protected isSomeVisibleSelected(): boolean {
    const rows = this.visibleRows();
    const selected = rows.filter((row) => this.selection.isSelected(row)).length;
    return selected > 0 && selected < rows.length;
  }

  protected toggleVisibleRows(): void {
    const rows = this.visibleRows();
    if (this.isAllVisibleSelected()) {
      this.selection.deselect(...rows);
    } else {
      this.selection.select(...rows);
    }
  }

  protected formatDate(date: string): string {
    const [year, month, day] = date.split('-');
    return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`;
  }

  protected formatBudget(budget: number): string {
    return `€${NUMBER_FORMATTER.format(budget)}`;
  }

  protected exportCsv(): void {
    const rows = this.filteredSortedRows();
    const csv = [
      ['ID', 'Project', 'Owner', 'Status', 'Priority', 'Progress', 'Due date', 'Budget'],
      ...rows.map((project) => [
        project.id,
        project.name,
        project.owner,
        project.status,
        project.priority,
        `${project.progress}%`,
        project.due,
        project.budget,
      ]),
    ]
      .map((row) => row.map(csvCell).join(','))
      .join('\r\n');
    const urlApi = this.document.defaultView?.URL;

    if (!urlApi?.createObjectURL) {
      return;
    }

    const url = urlApi.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = this.document.createElement('a');
    link.href = url;
    link.download = 'meridian-projects.csv';
    this.document.body.append(link);
    link.click();
    link.remove();
    urlApi.revokeObjectURL(url);
  }

  private applyFilters(): void {
    this.dataSource.filter = JSON.stringify({
      search: this.searchQuery.trim().toLowerCase(),
      status: this.statusFilter,
    } satisfies TableFilter);
    this.paginator?.firstPage();
  }

  private visibleRows(): Project[] {
    const rows = this.filteredSortedRows();
    const pageIndex = this.paginator?.pageIndex ?? 0;
    const pageSize = this.paginator?.pageSize ?? this.pageSize;
    return rows.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);
  }

  private filteredSortedRows(): Project[] {
    const rows = [...this.dataSource.filteredData];
    if (!this.sort?.active || !this.sort.direction) {
      return rows;
    }
    return this.dataSource.sortData(rows, this.sort);
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

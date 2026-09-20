import { DOCUMENT } from '@angular/common';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { createProjectDataSource } from './project-data-source';
import { exportProjects } from './project-export';
import { ProjectFiltersComponent } from './project-filters';
import { Project } from './project.schema';
import { ProjectTableComponent } from './project-table';
import { Density, StatusFilter, TableFilter } from './project-table.types';

@Component({
  imports: [
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    ProjectFiltersComponent,
    ProjectTableComponent,
  ],
  selector: 'app-projects',
  styleUrls: ['./projects.scss', './projects-footer.scss'],
  templateUrl: './projects.html',
})
export class ProjectsComponent implements AfterViewInit {
  private readonly document = inject(DOCUMENT);
  @ViewChild(MatPaginator) private paginator!: MatPaginator;
  protected readonly dataSource = createProjectDataSource();
  protected readonly selection = new SelectionModel<Project>(true);
  protected density: Density = 'comfortable';
  protected pageSize = 5;
  protected searchQuery = '';
  protected statusFilter: StatusFilter = 'All statuses';

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  protected setSearch(search: string): void {
    this.searchQuery = search;
    this.applyFilters();
  }

  protected setStatus(status: StatusFilter): void {
    this.statusFilter = status;
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

  protected exportCsv(): void {
    const rows = [...this.dataSource.filteredData];
    exportProjects(
      this.document,
      this.dataSource.sort?.active && this.dataSource.sort.direction
        ? this.dataSource.sortData(rows, this.dataSource.sort)
        : rows,
    );
  }

  private applyFilters(): void {
    this.dataSource.filter = JSON.stringify({
      search: this.searchQuery.trim().toLowerCase(),
      status: this.statusFilter,
    } satisfies TableFilter);
    this.paginator?.firstPage();
  }
}

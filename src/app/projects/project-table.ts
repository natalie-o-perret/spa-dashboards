import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, input, output, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Project } from '../app.data';
import { formatBudget, formatDate } from './project-format';
import { Density } from './project-table.types';

@Component({
  imports: [
    MatButtonModule,
    MatCheckboxModule,
    MatIconModule,
    MatProgressBarModule,
    MatSortModule,
    MatTableModule,
  ],
  selector: 'app-project-table',
  styleUrls: [
    './project-table.scss',
    './project-table-columns.scss',
    './project-table-badges.scss',
  ],
  templateUrl: './project-table.html',
})
export class ProjectTableComponent implements AfterViewInit {
  readonly dataSource = input.required<MatTableDataSource<Project>>();
  readonly density = input.required<Density>();
  readonly selection = input.required<SelectionModel<Project>>();
  readonly clear = output<void>();
  private readonly sort = viewChild.required(MatSort);
  protected readonly columns = [
    'select',
    'name',
    'owner',
    'status',
    'priority',
    'progress',
    'due',
    'budget',
  ];
  protected readonly formatBudget = formatBudget;
  protected readonly formatDate = formatDate;

  ngAfterViewInit(): void {
    this.dataSource().sort = this.sort();
  }

  protected isAllVisibleSelected(): boolean {
    const rows = this.visibleRows();
    return rows.length > 0 && rows.every((row) => this.selection().isSelected(row));
  }

  protected isSomeVisibleSelected(): boolean {
    const rows = this.visibleRows();
    const selected = rows.filter((row) => this.selection().isSelected(row)).length;
    return selected > 0 && selected < rows.length;
  }

  protected toggleVisibleRows(): void {
    const rows = this.visibleRows();
    if (this.isAllVisibleSelected()) this.selection().deselect(...rows);
    else this.selection().select(...rows);
  }

  protected badgeClass(value: string): string {
    return value.toLowerCase().replace(' ', '-');
  }

  private visibleRows(): Project[] {
    const dataSource = this.dataSource();
    const rows =
      dataSource.sort?.active && dataSource.sort.direction
        ? dataSource.sortData([...dataSource.filteredData], dataSource.sort)
        : dataSource.filteredData;
    const index = dataSource.paginator?.pageIndex ?? 0;
    const size = dataSource.paginator?.pageSize ?? 5;
    return rows.slice(index * size, (index + 1) * size);
  }
}

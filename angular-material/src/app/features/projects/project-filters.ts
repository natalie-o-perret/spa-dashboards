import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProjectStatusBadgeComponent } from './project-status-badge';
import { Density, StatusFilter } from './project-table.types';

@Component({
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ProjectStatusBadgeComponent,
  ],
  selector: 'app-project-filters',
  styleUrl: './project-filters.scss',
  templateUrl: './project-filters.html',
})
export class ProjectFiltersComponent {
  readonly density = input.required<Density>();
  readonly searchQuery = input.required<string>();
  readonly statusFilter = input.required<StatusFilter>();
  readonly clear = output<void>();
  readonly densityChange = output<Density>();
  readonly searchChange = output<string>();
  readonly statusChange = output<StatusFilter>();
  protected readonly statuses: readonly StatusFilter[] = [
    'All statuses',
    'On track',
    'At risk',
    'Blocked',
    'Complete',
  ];
}

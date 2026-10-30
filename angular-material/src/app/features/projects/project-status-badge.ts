import { Component, input } from '@angular/core';
import { StatusFilter } from './project-table.types';

@Component({
  selector: 'app-project-status-badge',
  styleUrl: './project-table-badges.scss',
  styles: ':host { display: inline-flex; vertical-align: top; }',
  template: `
    @if (status() === 'All statuses') {
      {{ status() }}
    } @else {
      <span class="table-badge status-badge" [class]="status().toLowerCase().replace(' ', '-')">
        <i aria-hidden="true"></i>{{ status() }}
      </span>
    }
  `,
})
export class ProjectStatusBadgeComponent {
  readonly status = input.required<StatusFilter>();
}

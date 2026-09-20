import { Component } from '@angular/core';
import { CapacityComponent } from './capacity';
import { TrendComponent } from './trend';

@Component({
  imports: [CapacityComponent, TrendComponent],
  selector: 'app-analytics',
  styleUrl: './analytics.scss',
  template: `
    <section id="analytics" class="analytics-grid" aria-label="Portfolio analytics">
      <app-trend />
      <app-capacity />
    </section>
  `,
})
export class AnalyticsComponent {}

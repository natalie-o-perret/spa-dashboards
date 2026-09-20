import { Component } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { METRICS } from '../portfolio.data';

@Component({
  imports: [MatChipsModule, MatIconModule],
  selector: 'app-overview',
  styleUrls: ['./overview.scss', './metrics.scss'],
  templateUrl: './overview.html',
})
export class OverviewComponent {
  protected readonly metrics = METRICS;
}

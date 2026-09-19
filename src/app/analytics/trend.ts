import { Component } from '@angular/core';
import { TREND_AREA, TREND_LINE, TREND_POINTS } from '../app.data';

@Component({
  selector: 'app-trend',
  styleUrls: ['./trend.scss', './trend-chart.scss'],
  templateUrl: './trend.html',
})
export class TrendComponent {
  protected readonly area = TREND_AREA;
  protected readonly line = TREND_LINE;
  protected readonly points = TREND_POINTS;
}

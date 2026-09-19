import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { TEAM_CAPACITY } from '../app.data';

@Component({
  imports: [MatIconModule, MatProgressBarModule],
  selector: 'app-capacity',
  styleUrl: './capacity.scss',
  templateUrl: './capacity.html',
})
export class CapacityComponent {
  protected readonly teams = TEAM_CAPACITY;
}

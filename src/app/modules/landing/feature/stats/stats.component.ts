import { Component } from '@angular/core';
import { stats } from '../../utils/data/stats';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.component.html'
})
export class StatsComponent {
  stats = stats;
}

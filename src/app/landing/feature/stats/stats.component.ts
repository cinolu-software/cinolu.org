import { Component } from '@angular/core';
import { stats } from '../../utils/data/stats';
import { TranslocoDirective } from '@jsverse/transloco';

@Component({
  selector: 'app-stats',
  imports: [TranslocoDirective],
  templateUrl: './stats.component.html'
})
export class StatsComponent {
  stats = stats;
}

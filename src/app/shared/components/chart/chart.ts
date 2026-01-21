import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-chart',
  imports: [LucideAngularModule],
  templateUrl: './chart.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartComponent {
  title = input.required<string>();
  chartId = input<string>('chart-' + Math.random().toString(36).substr(2, 9));
  height = input<string>('400px');
  options = input<Record<string, unknown>>();
}

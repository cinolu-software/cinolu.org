import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './chart.html',
})
export class ChartComponent {
  title = input.required<string>();
  chartId = input<string>('chart-' + Math.random().toString(36).substr(2, 9));
  height = input<string>('400px');
  options = input<Record<string, unknown>>();
}

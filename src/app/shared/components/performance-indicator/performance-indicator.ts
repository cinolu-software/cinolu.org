import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceStatusPipe } from '../../pipes/performance-status.pipe';

/**
 * Reusable component to display performance metrics and progress bar
 */
@Component({
  selector: 'app-performance-indicator',
  standalone: true,
  imports: [CommonModule, PerformanceStatusPipe],
  templateUrl: './performance-indicator.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PerformanceIndicatorComponent {
  totalTargeted = input.required<number>();
  totalAchieved = input.required<number>();
  percentage = input.required<number>();
  label = input('Performance');
}

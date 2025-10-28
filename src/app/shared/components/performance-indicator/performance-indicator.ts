import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
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
  @Input({ required: true }) totalTargeted!: number;
  @Input({ required: true }) totalAchieved!: number;
  @Input({ required: true }) percentage!: number;
  @Input() label = 'Performance';
}

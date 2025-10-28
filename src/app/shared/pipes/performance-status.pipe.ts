import { Pipe, PipeTransform } from '@angular/core';
import { getPerformanceStatus } from '../helpers/metrics.helper';

/**
 * Pipe to get CSS class based on performance percentage
 * Usage: {{ percentage | performanceStatus }}
 */
@Pipe({
  name: 'performanceStatus',
  standalone: true
})
export class PerformanceStatusPipe implements PipeTransform {
  transform(percentage: number): string {
    const status = getPerformanceStatus(percentage);
    const statusMap = {
      low: 'bg-red-500',
      medium: 'bg-yellow-500',
      high: 'bg-green-500'
    };
    return statusMap[status];
  }
}

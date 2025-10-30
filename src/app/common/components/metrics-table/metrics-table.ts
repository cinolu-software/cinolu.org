import { Component, ChangeDetectionStrategy, input, output, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { LucideAngularModule, ChartColumn } from 'lucide-angular';
import { MetricsMap } from '@common/helpers';
import { IIndicator, IMetric } from '@common/models';
import { CircularProgressComponent } from '../circular-progress/circular-progress';

@Component({
  selector: 'app-metrics-table',
  imports: [CommonModule, FormsModule, InputText, Button, LucideAngularModule, CircularProgressComponent],
  templateUrl: './metrics-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetricsTableComponent {
  indicators = input.required<IIndicator[]>();
  metricsMap = input.required<MetricsMap>();
  existingMetrics = input<IMetric[]>([]);
  isLoading = input.required<boolean>();
  saveKPIs = output<void>();
  saveReports = output<void>();
  icons = {
    barChart: ChartColumn
  };

  // Signal to track changes in metrics values
  private metricsVersion = signal(0);

  totalIndicators = computed(() => this.indicators().length);

  totalTarget = computed(() => {
    // Track metrics version to ensure reactivity
    this.metricsVersion();
    return this.indicators().reduce((sum, indicator) => {
      const target = this.metricsMap()[indicator.id]?.target ?? 0;
      return sum + target;
    }, 0);
  });

  totalAchieved = computed(() => {
    // Track metrics version to ensure reactivity
    this.metricsVersion();
    return this.indicators().reduce((sum, indicator) => {
      const achieved = this.metricsMap()[indicator.id]?.achieved ?? 0;
      return sum + achieved;
    }, 0);
  });

  overallPerformance = computed(() => {
    const target = this.totalTarget();
    if (target === 0) return 0;
    const achieved = this.totalAchieved();
    return Math.round((achieved / target) * 100);
  });

  #existingTargets = computed(() => {
    return new Set(
      this.existingMetrics()
        .filter((m) => m.target && m.target > 0)
        .map((m) => m.indicator.id)
    );
  });

  hasExistingTarget(indicatorId: string): boolean {
    return this.#existingTargets().has(indicatorId);
  }

  hasUnsavedKPIs(): boolean {
    return this.indicators().some((indicator) => {
      const hasTarget = !!this.metricsMap()[indicator.id]?.target;
      const isExisting = this.hasExistingTarget(indicator.id);
      return hasTarget && !isExisting;
    });
  }

  calculatePercentage(indicatorId: string): number {
    const metric = this.metricsMap()[indicatorId];
    if (!metric || !metric.target || metric.target === 0) {
      return 0;
    }
    const achieved = metric.achieved ?? 0;
    return Math.round((achieved / metric.target) * 100);
  }

  onMetricChange(): void {
    // Trigger recalculation of computed signals
    this.metricsVersion.update((v) => v + 1);
  }

  onSaveKPIs(): void {
    this.saveKPIs.emit();
  }

  onSaveReports(): void {
    this.saveReports.emit();
  }
}

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { IIndicator } from '../../models/entities.models';
import { MetricsMap } from '../../helpers/metrics.helper';

/**
 * Reusable component for editing metrics in a table format
 */
@Component({
  selector: 'app-metrics-table',
  standalone: true,
  imports: [CommonModule, FormsModule, InputText, Button],
  templateUrl: './metrics-table.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetricsTableComponent {
  @Input({ required: true }) indicators!: IIndicator[];
  @Input({ required: true }) metricsMap!: MetricsMap;
  @Input() isLoading = false;
  @Output() save = new EventEmitter<void>();

  onSave(): void {
    this.save.emit();
  }
}

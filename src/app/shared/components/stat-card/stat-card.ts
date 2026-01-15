import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';
import { CardModule } from 'primeng/card';
import { LucideAngularModule, LucideIconData, Users } from 'lucide-angular';

@Component({
  selector: 'app-stat-card',
  imports: [CardModule, LucideAngularModule, NgClass],
  templateUrl: './stat-card.html'
})
export class StatCardComponent {
  title = input<string>('');
  value = input<number | string>(0);
  icon = input<LucideIconData>(Users);
  color = input<'primary' | 'success' | 'warning' | 'danger' | 'info'>('primary');
  trend = input<number>();
  subtitle = input<string>();

  Math = Math;

  get formattedValue(): string {
    if (typeof this.value() === 'number') {
      return this.value().toLocaleString('fr-FR');
    }
    return this.value() as string;
  }

  getBorderClass(): string {
    const colorMap = {
      primary: 'border-l-4 border-l-primary-500 border border-gray-200',
      success: 'border-l-4 border-l-success-500 border border-gray-200',
      warning: 'border-l-4 border-l-warning-500 border border-gray-200',
      danger: 'border-l-4 border-l-danger-500 border border-gray-200',
      info: 'border-l-4 border-l-info-500 border border-gray-200'
    };
    return colorMap[this.color()] || colorMap.primary;
  }

  getIconBgClass(): string {
    const colorMap = {
      primary: 'bg-primary-100',
      success: 'bg-success-100',
      warning: 'bg-warning-100',
      danger: 'bg-danger-100',
      info: 'bg-info-100'
    };
    return colorMap[this.color()] || colorMap.primary;
  }

  getIconColorClass(): string {
    const colorMap = {
      primary: 'text-primary-600',
      success: 'text-success-600',
      warning: 'text-warning-600',
      danger: 'text-danger-600',
      info: 'text-info-600'
    };
    return colorMap[this.color()] || colorMap.primary;
  }
}

import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { DataViewModule } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { AvatarModule } from 'primeng/avatar';
import { LucideAngularModule, LucideIconData, MapPin, Inbox } from 'lucide-angular';

export interface ActivityItem {
  id: number;
  title: string;
  subtitle?: string;
  meta?: {
    left?: string;
    right?: string;
  };
  badge?: {
    label: string;
    color: string;
  };
  icon?: LucideIconData;
  iconColor?: string;
}

export interface ActivityAction {
  label: string;
  icon: LucideIconData;
  callback: (item: ActivityItem) => void;
}

@Component({
  selector: 'app-activity-list',
  imports: [DataViewModule, ButtonModule, ChipModule, AvatarModule, LucideAngularModule, NgClass],
  templateUrl: './activity-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ActivityListComponent {
  items = input<ActivityItem[]>([]);
  title = input<string>();
  actions = input<ActivityAction[]>();
  emptyMessage = input<string>('Aucune activité récente');
  emptyIcon = input<LucideIconData>(Inbox);
  emptyAction = input<{ label: string; icon: LucideIconData; callback: () => void }>();

  defaultIcon = MapPin;

  // Computed signals pour les fonctions utilisées dans le template
  badgeClassFn = computed(() => {
    return (color: string): string => {
      const colorMap: Record<string, string> = {
        GERE: 'bg-green-100 text-green-700',
        NON_GERE: 'bg-yellow-100 text-yellow-700',
        success: 'bg-green-100 text-green-700',
        warning: 'bg-yellow-100 text-yellow-700',
        danger: 'bg-red-100 text-red-700',
        info: 'bg-blue-100 text-blue-700',
        primary: 'bg-blue-100 text-blue-700'
      };
      return colorMap[color] || 'bg-gray-100 text-gray-700';
    };
  });

  iconBgClassFn = computed(() => {
    return (color: string): string => {
      const colorMap: Record<string, string> = {
        primary: 'bg-primary-100',
        success: 'bg-success-100',
        warning: 'bg-warning-100',
        danger: 'bg-danger-100',
        info: 'bg-info-100'
      };
      return colorMap[color] || 'bg-primary-100';
    };
  });

  iconColorClassFn = computed(() => {
    return (color: string): string => {
      const colorMap: Record<string, string> = {
        primary: 'text-primary-600',
        success: 'text-success-600',
        warning: 'text-warning-600',
        danger: 'text-danger-600',
        info: 'text-info-600'
      };
      return colorMap[color] || 'text-primary-600';
    };
  });

  /** @deprecated Use badgeClassFn() computed signal instead */
  getBadgeClass(color: string): string {
    const colorMap: Record<string, string> = {
      GERE: 'bg-green-100 text-green-700',
      NON_GERE: 'bg-yellow-100 text-yellow-700',
      success: 'bg-green-100 text-green-700',
      warning: 'bg-yellow-100 text-yellow-700',
      danger: 'bg-red-100 text-red-700',
      info: 'bg-blue-100 text-blue-700',
      primary: 'bg-blue-100 text-blue-700'
    };
    return colorMap[color] || 'bg-gray-100 text-gray-700';
  }

  /** @deprecated Use iconBgClassFn() computed signal instead */
  getIconBgClass(color: string): string {
    const colorMap: Record<string, string> = {
      primary: 'bg-primary-100',
      success: 'bg-success-100',
      warning: 'bg-warning-100',
      danger: 'bg-danger-100',
      info: 'bg-info-100'
    };
    return colorMap[color] || 'bg-primary-100';
  }

  /** @deprecated Use iconColorClassFn() computed signal instead */
  getIconColorClass(color: string): string {
    const colorMap: Record<string, string> = {
      primary: 'text-primary-600',
      success: 'text-success-600',
      warning: 'text-warning-600',
      danger: 'text-danger-600',
      info: 'text-info-600'
    };
    return colorMap[color] || 'text-primary-600';
  }
}

import { Component, input, output, computed, ChangeDetectionStrategy } from '@angular/core';
import { DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { TableModule, TableLazyLoadEvent } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ChipModule } from 'primeng/chip';
import { LucideAngularModule, LucideIconData } from 'lucide-angular';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  format?: 'text' | 'badge' | 'date' | 'number';
}

export interface TableAction {
  label: string;
  icon: LucideIconData;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  callback: (row: Record<string, unknown>) => void;
  visible?: (row: Record<string, unknown>) => boolean;
}

@Component({
  selector: 'app-data-table',
  imports: [TableModule, ButtonModule, ChipModule, LucideAngularModule, DatePipe, DecimalPipe, NgClass],
  templateUrl: './data-table.html',
  styleUrl: './data-table.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataTableComponent {
  data = input<Record<string, unknown>[]>([]);
  columns = input<TableColumn[]>([]);
  actions = input<TableAction[]>();
  title = input<string>();
  paginator = input<boolean>(false);
  rows = input<number>(10);
  totalRecords = input<number>(0);
  loading = input<boolean>(false);
  lazy = input<boolean>(false);
  emptyMessage = input<string>('Aucune donnée disponible');

  lazyLoad = output<TableLazyLoadEvent>();

  onLazyLoadData(event: TableLazyLoadEvent): void {
    this.lazyLoad.emit(event);
  }

  // Computed signal pour la fonction getBadgeClass - convertit une fonction en computed
  badgeClassFn = computed(() => {
    return (value: unknown): string => {
      const valueStr = value?.toString().toUpperCase();

      switch (valueStr) {
        case 'GERE':
          return 'bg-green-100 text-green-700';
        case 'NON_GERE':
          return 'bg-yellow-100 text-yellow-700';
        case 'ADMIN':
          return 'bg-purple-100 text-purple-700';
        case 'AGENT':
          return 'bg-blue-100 text-blue-700';
        default:
          return 'bg-gray-100 text-gray-700';
      }
    };
  });

  // Computed signal pour les actions visibles - retourne une fonction
  visibleActionsFn = computed(() => {
    const actions = this.actions();
    return (row: Record<string, unknown>): TableAction[] => {
      if (!actions) return [];
      return actions.filter((action) => {
        if (action.visible) {
          return action.visible(row);
        }
        return true;
      });
    };
  });

  // Computed signal pour les classes des boutons d'action
  actionButtonClassFn = computed(() => {
    return (action: TableAction): string => {
      const colorMap = {
        primary: '!bg-primary-600 hover:!bg-primary-700 !text-white !border-primary-600',
        success: '!bg-success-600 hover:!bg-success-700 !text-white !border-success-600',
        warning: '!bg-warning-600 hover:!bg-warning-700 !text-white !border-warning-600',
        danger: '!bg-danger-600 hover:!bg-danger-700 !text-white !border-danger-600',
        secondary: '!bg-gray-600 hover:!bg-gray-700 !text-white !border-gray-600'
      };
      return colorMap[action.color || 'primary'];
    };
  });

  /** @deprecated Use badgeClassFn() computed signal instead */
  getBadgeClass(value: unknown): string {
    const valueStr = value?.toString().toUpperCase();

    switch (valueStr) {
      case 'GERE':
        return 'bg-green-100 text-green-700';
      case 'NON_GERE':
        return 'bg-yellow-100 text-yellow-700';
      case 'ADMIN':
        return 'bg-purple-100 text-purple-700';
      case 'AGENT':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  }

  /** @deprecated Use visibleActionsFn() computed signal instead */
  getVisibleActions(row: Record<string, unknown>): TableAction[] {
    if (!this.actions()) return [];
    return this.actions()!.filter((action) => {
      if (action.visible) {
        return action.visible(row);
      }
      return true;
    });
  }

  /** @deprecated Use actionButtonClassFn() computed signal instead */
  getActionButtonClass(action: TableAction): string {
    const colorMap = {
      primary: '!bg-primary-600 hover:!bg-primary-700 !text-white !border-primary-600',
      success: '!bg-success-600 hover:!bg-success-700 !text-white !border-success-600',
      warning: '!bg-warning-600 hover:!bg-warning-700 !text-white !border-warning-600',
      danger: '!bg-danger-600 hover:!bg-danger-700 !text-white !border-danger-600',
      secondary: '!bg-gray-600 hover:!bg-gray-700 !text-white !border-gray-600'
    };
    return colorMap[action.color || 'primary'];
  }
}

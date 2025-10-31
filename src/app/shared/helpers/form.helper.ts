import { ICategory } from '../models/entities.models';
import { AbstractControl } from '@angular/forms';

export function parseDate(dateString: string | Date): Date {
  return new Date(dateString);
}

export function extractCategoryIds(categories?: ICategory[]): string[] {
  return categories?.map((c) => c.id) ?? [];
}

export function extractYear(date: string | Date): number {
  return new Date(date).getFullYear();
}

export function extractIds<T extends { id: string }>(items?: T[]): string[] {
  return items?.map((item) => item.id) ?? [];
}

export function markAllAsTouched(control: AbstractControl): void {
  control.markAsTouched();
  if ('controls' in control) {
    const controls = (control as { controls: Record<string, AbstractControl> }).controls;
    Object.values(controls).forEach((ctrl) => {
      markAllAsTouched(ctrl);
    });
  }
}

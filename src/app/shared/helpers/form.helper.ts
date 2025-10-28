import { ICategory } from '../models/entities.models';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * Converts date string to Date object
 * @param dateString - Date string to convert
 * @returns Date object
 */
export function parseDate(dateString: string | Date): Date {
  return new Date(dateString);
}

/**
 * Extracts category IDs from category objects
 * @param categories - Array of categories
 * @returns Array of category IDs
 */
export function extractCategoryIds(categories?: ICategory[]): string[] {
  return categories?.map((c) => c.id) ?? [];
}

/**
 * Extracts year from date string or Date object
 * @param date - Date string or Date object
 * @returns Year as number
 */
export function extractYear(date: string | Date): number {
  return new Date(date).getFullYear();
}

/**
 * Extracts IDs from an array of objects with an id property
 * @param items - Array of items with id property
 * @returns Array of IDs
 */
export function extractIds<T extends { id: string }>(items?: T[]): string[] {
  return items?.map((item) => item.id) ?? [];
}

/**
 * Marks all controls in a form group as touched
 * @param control - Form control or group
 */
export function markAllAsTouched(control: AbstractControl): void {
  control.markAsTouched();

  if ('controls' in control) {
    const controls = (control as { controls: Record<string, AbstractControl> }).controls;
    Object.values(controls).forEach((ctrl) => {
      markAllAsTouched(ctrl);
    });
  }
}

/**
 * Validator to check if date is in the future
 * @returns Validator function
 */
export function futureDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;
    const inputDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return inputDate >= today ? null : { pastDate: true };
  };
}

/**
 * Validator to check if end date is after start date
 * @param startDateKey - Key of start date control
 * @returns Validator function
 */
export function dateRangeValidator(startDateKey: string): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value || !control.parent) return null;

    const startDate = control.parent.get(startDateKey)?.value;
    if (!startDate) return null;

    const start = new Date(startDate);
    const end = new Date(control.value);

    return end >= start ? null : { invalidDateRange: true };
  };
}

/**
 * Resets form to initial state
 * @param control - Form control or group
 * @param value - Optional initial value
 */
export function resetForm(control: AbstractControl, value?: unknown): void {
  control.reset(value);
  control.markAsUntouched();
  control.markAsPristine();
  control.updateValueAndValidity();
}

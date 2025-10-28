import { ICategory } from '../models/entities.models';

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

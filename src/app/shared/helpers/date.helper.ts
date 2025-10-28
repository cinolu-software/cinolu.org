/**
 * Date utility functions for consistent date handling across the application
 */

/**
 * Formats a date to ISO string
 * @param date - Date to format
 * @returns ISO string
 */
export function toISOString(date: Date | string): string {
  return new Date(date).toISOString();
}

/**
 * Formats a date to locale string
 * @param date - Date to format
 * @param locale - Locale string (default: 'fr-FR')
 * @param options - Intl.DateTimeFormatOptions
 * @returns Formatted date string
 */
export function formatDate(date: Date | string, locale = 'fr-FR', options?: Intl.DateTimeFormatOptions): string {
  return new Date(date).toLocaleDateString(locale, options);
}

/**
 * Formats a date to relative time (e.g., "2 days ago")
 * @param date - Date to format
 * @param locale - Locale string (default: 'fr')
 * @returns Relative time string
 */
export function formatRelativeTime(date: Date | string, locale = 'fr'): string {
  const now = new Date();
  const past = new Date(date);
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  const intervals: [Intl.RelativeTimeFormatUnit, number][] = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
  ];

  for (const [unit, secondsInUnit] of intervals) {
    const interval = Math.floor(diffInSeconds / secondsInUnit);
    if (interval >= 1 || unit === 'second') {
      return rtf.format(-interval, unit);
    }
  }

  return rtf.format(0, 'second');
}

/**
 * Checks if a date is in the past
 * @param date - Date to check
 * @returns True if date is in the past
 */
export function isPast(date: Date | string): boolean {
  return new Date(date) < new Date();
}

/**
 * Checks if a date is in the future
 * @param date - Date to check
 * @returns True if date is in the future
 */
export function isFuture(date: Date | string): boolean {
  return new Date(date) > new Date();
}

/**
 * Checks if a date is today
 * @param date - Date to check
 * @returns True if date is today
 */
export function isToday(date: Date | string): boolean {
  const d = new Date(date);
  const today = new Date();
  return (
    d.getDate() === today.getDate() && d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear()
  );
}

/**
 * Gets the difference between two dates in days
 * @param date1 - First date
 * @param date2 - Second date
 * @returns Number of days
 */
export function daysBetween(date1: Date | string, date2: Date | string): number {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

/**
 * Adds days to a date
 * @param date - Base date
 * @param days - Number of days to add
 * @returns New date
 */
export function addDays(date: Date | string, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Gets start of day
 * @param date - Date to process
 * @returns Date at start of day (00:00:00)
 */
export function startOfDay(date: Date | string): Date {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Gets end of day
 * @param date - Date to process
 * @returns Date at end of day (23:59:59)
 */
export function endOfDay(date: Date | string): Date {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

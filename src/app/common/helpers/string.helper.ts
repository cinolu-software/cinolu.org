/**
 * String utility functions
 */

/**
 * Capitalizes first letter of a string
 * @param str - String to capitalize
 * @returns Capitalized string
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Converts string to title case
 * @param str - String to convert
 * @returns Title cased string
 */
export function titleCase(str: string): string {
  if (!str) return '';
  return str.split(' ').map(capitalize).join(' ');
}

/**
 * Truncates string to specified length
 * @param str - String to truncate
 * @param length - Max length
 * @param suffix - Suffix to append (default: '...')
 * @returns Truncated string
 */
export function truncate(str: string, length: number, suffix = '...'): string {
  if (!str || str.length <= length) return str;
  return str.substring(0, length).trim() + suffix;
}

/**
 * Converts string to slug format
 * @param str - String to slugify
 * @returns Slugified string
 */
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Removes HTML tags from string
 * @param html - HTML string
 * @returns Plain text
 */
export function stripHtml(html: string): string {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}

/**
 * Checks if string is valid email
 * @param email - Email string to validate
 * @returns True if valid email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Generates a random string
 * @param length - Length of string
 * @returns Random string
 */
export function randomString(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * Escapes HTML special characters
 * @param str - String to escape
 * @returns Escaped string
 */
export function escapeHtml(str: string): string {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

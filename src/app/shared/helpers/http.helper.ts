import { HttpParams } from '@angular/common/http';

/**
 * Type for query parameter values
 */
export type QueryParamValue = string | number | boolean | null | undefined;

/**
 * Interface for query parameters object
 */
export type QueryParams = Record<string, QueryParamValue | QueryParamValue[]>;

/**
 * Builds HttpParams from an object, filtering out null/undefined values
 * @param params - Object containing query parameters
 * @returns HttpParams instance
 */
export function buildHttpParams(params: QueryParams): HttpParams {
  let httpParams = new HttpParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === null || value === undefined) return;

    if (Array.isArray(value)) {
      value.forEach((item) => {
        if (item !== null && item !== undefined) {
          httpParams = httpParams.append(key, String(item));
        }
      });
    } else {
      httpParams = httpParams.set(key, String(value));
    }
  });

  return httpParams;
}

/**
 * Converts an object to URL query string
 * @param params - Object containing query parameters
 * @returns URL query string
 */
export function toQueryString(params: QueryParams): string {
  const httpParams = buildHttpParams(params);
  return httpParams.toString();
}

/**
 * Removes empty values from object (null, undefined, empty string)
 * @param obj - Object to clean
 * @returns Cleaned object
 */
export function removeEmptyValues<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      (acc as Record<string, unknown>)[key] = value;
    }
    return acc;
  }, {} as Partial<T>);
}

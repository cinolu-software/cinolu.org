import { HttpParams } from '@angular/common/http';

export type QueryParamValue = string | number | boolean | null | undefined;

export type QueryParams = Record<string, QueryParamValue | QueryParamValue[]>;

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

export function toQueryString(params: QueryParams): string {
  const httpParams = buildHttpParams(params);
  return httpParams.toString();
}

export function removeEmptyValues<T extends Record<string, unknown>>(obj: T): Partial<T> {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    if (value !== null && value !== undefined && value !== '') {
      (acc as Record<string, unknown>)[key] = value;
    }
    return acc;
  }, {} as Partial<T>);
}

import { HttpParams } from '@angular/common/http';

export const buildQueryParams = (q: unknown): HttpParams | undefined => {
  let params = new HttpParams();
  const queryParams = q as Record<string, unknown>;
  Object.keys(queryParams).forEach((key) => {
    const value = queryParams[key];
    if (value == null || value === '') return;
    params = params.set(key, value as string);
  });
  return params;
};

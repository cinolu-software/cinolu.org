import { HttpParams } from '@angular/common/http';

export const buildQueryParams = (queryParams: unknown): HttpParams => {
  let params = new HttpParams();
  Object.keys(queryParams).forEach((key) => {
    const value = queryParams[key];
    if (!value) return;
    params = params.set(key, value);
  });
  return params;
};

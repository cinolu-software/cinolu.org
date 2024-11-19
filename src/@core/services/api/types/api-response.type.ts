import { Observable, of } from 'rxjs';

export interface IAPIResponse<T> {
  isLoading: boolean;
  data: T | null;
  error: string | null;
}

export function createInitialApiResponse<T>(): Observable<IAPIResponse<T>> {
  return of({ isLoading: false, data: null, error: null });
}

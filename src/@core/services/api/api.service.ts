import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, startWith, tap } from 'rxjs/operators';
import { IAPIResponse } from './types/api-response.type';

@Injectable({
  providedIn: 'root'
})
export class APIService {
  #http = inject(HttpClient);

  fetchData<T>(url: string, params: HttpParams = null, onSuccess?: (data?: T) => void): Observable<IAPIResponse<T>> {
    return this.#http.get<{ data: T }>(url, { params }).pipe(
      map(({ data }) => ({ isLoading: false, data, error: null })),
      tap((res) => onSuccess && onSuccess(res.data)),
      catchError((err) => of({ isLoading: false, data: null, error: err.error['message'] })),
      startWith({ isLoading: true, data: null, error: null })
    );
  }

  postData<U, T>(url: string, payload: U, onSuccess?: (data?: T) => void): Observable<IAPIResponse<T>> {
    return this.#http.post<{ data: T }>(url, payload).pipe(
      map(({ data }) => ({ isLoading: false, data, error: null })),
      tap((res) => onSuccess && onSuccess(res.data)),
      catchError((err) => of({ isLoading: false, data: null, error: err.error['message'] })),
      startWith({ isLoading: true, data: null, error: null })
    );
  }
}

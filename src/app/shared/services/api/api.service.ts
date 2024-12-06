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

  get<T>(url: string, params: HttpParams = null, onSuccess?: (data?: T) => void): Observable<IAPIResponse<T>> {
    return this.#http.get<{ data: T }>(url, { params }).pipe(
      map((res) => ({ isLoading: false, data: res?.data, error: null, isSuccess: true })),
      tap((res) => onSuccess && onSuccess(res?.data)),
      catchError((err) => of({ isLoading: false, data: null, error: err.error['message'], isSuccess: false })),
      startWith({ isLoading: true, data: null, error: null, isSuccess: false })
    );
  }

  post<U, T>(url: string, payload: U, onSuccess?: (data?: T) => void): Observable<IAPIResponse<T>> {
    return this.#http.post<{ data: T }>(url, payload).pipe(
      map((res) => ({ isLoading: false, data: res?.data, error: null, isSuccess: true })),
      tap((res) => onSuccess && onSuccess(res?.data)),
      catchError((err) => of({ isLoading: false, data: null, error: err.error['message'], isSuccess: false })),
      startWith({ isLoading: true, data: null, error: null, isSuccess: false })
    );
  }

  patch<U, T>(url: string, payload: U, onSuccess?: (data?: T) => void): Observable<IAPIResponse<T>> {
    return this.#http.patch<{ data: T }>(url, payload).pipe(
      map((res) => ({ isLoading: false, data: res?.data, error: null, isSuccess: true })),
      tap((res) => onSuccess && onSuccess(res?.data)),
      catchError((err) => of({ isLoading: false, data: null, error: err.error['message'], isSuccess: false })),
      startWith({ isLoading: true, data: null, error: null, isSuccess: false })
    );
  }
}

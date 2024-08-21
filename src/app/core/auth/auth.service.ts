import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IUser } from '../types/models.interface';
import { environment } from 'environments/environment.development';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _httpClient = inject(HttpClient);
  private _apiUrl = environment.apiUrl;

  authenticate(): Observable<IUser> {
    return this._httpClient.get<{ data: IUser }>(this._apiUrl + 'auth/profile').pipe(map((response) => response.data));
  }

  signOut(): Observable<null> {
    return this._httpClient.post(this._apiUrl + 'auth/logout', {}).pipe(map(() => null));
  }

  forgotPassword(email: string): Observable<any> {
    return this._httpClient
      .post<{ data: IUser }>(this._apiUrl + 'auth/forgot-password-request', email)
      .pipe(map((response) => response.data));
  }

  resetPassword(password: string): Observable<IUser> {
    return this._httpClient
      .post<{ data: IUser }>(this._apiUrl + 'auth/reset-password', password)
      .pipe(map((response) => response.data));
  }

  signIn(credentials: { email: string; password: string }): Observable<IUser> {
    return this._httpClient
      .post<{ data: IUser }>(this._apiUrl + 'auth/login', credentials)
      .pipe(map((res) => res.data));
  }
}

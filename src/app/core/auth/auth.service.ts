import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { IUser } from '../types/models.interface';
import { environment } from 'environments/environment.development';
import { Router } from '@angular/router';
import { IUserCredentials } from 'app/modules/auth/sign-in/types/sign-in-payload.interface';
import { IForgotPasswordPayload } from 'app/modules/auth/forgot-password/types/forgot-password-payload.interface';
import { IResetPasswordPayload } from 'app/modules/auth/reset-password/types/reset-password-payload.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _httpClient = inject(HttpClient);
  private _apiUrl = environment.apiUrl;
  private _router = inject(Router);

  authenticate(): Observable<IUser> {
    return this._httpClient.get<{ data: IUser }>(this._apiUrl + 'auth/profile').pipe(map((response) => response.data));
  }

  signIn(credentials: IUserCredentials): Observable<IUser> {
    return this._httpClient.post<{ data: IUser }>(this._apiUrl + 'auth/login', credentials).pipe(
      map((res) => res.data),
      tap(() => this._router.navigate(['/dashboard']))
    );
  }

  signOut(): Observable<string> {
    return this._httpClient.post<{ data: string }>(this._apiUrl + 'auth/logout', {}).pipe(map((res) => res.data));
  }

  forgotPassword(credentials: IForgotPasswordPayload): Observable<any> {
    return this._httpClient.post<{ data: IUser }>(this._apiUrl + 'auth/forgot-password', credentials).pipe(
      map((response) => response.data),
      tap(() => this._router.navigate(['/reset-password']))
    );
  }

  resetPassword(payload: IResetPasswordPayload): Observable<IUser> {
    return this._httpClient.post<{ data: IUser }>(this._apiUrl + 'auth/reset-password', payload).pipe(
      map((response) => response.data),
      tap(() => this._router.navigate(['/sign-in']))
    );
  }
}

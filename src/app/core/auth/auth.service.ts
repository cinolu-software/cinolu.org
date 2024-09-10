import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IUser } from '../types/models.interface';
import { ISignInPayload } from './types/sign-in.interface';
import { ISignUpPayload } from './types/sign-up.interface';

@Injectable({ providedIn: 'root' })
export class AuthService implements OnInit {
  accessToken: string;
  private _httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.accessToken = '';
  }

  forgotPassword(email: string): Observable<{ data: IUser }> {
    return this._httpClient.post<{ data: IUser }>('auth/forgot-password', email);
  }

  resetPassword(password: string): Observable<{ data: IUser }> {
    return this._httpClient.post<{ data: IUser }>('auth/reset-password', password);
  }

  signIn(payload: ISignInPayload): Observable<{ access_token: string }> {
    return this._httpClient.post<{ access_token: string }>('auth/sign-in', payload);
  }

  signOut(): Observable<boolean> {
    window.localStorage.removeItem('accessToken');
    return of(true);
  }

  signUp(payload: ISignUpPayload): Observable<{ data: IUser }> {
    return this._httpClient.post<{ data: IUser }>('auth/sign-up', payload);
  }
}

import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { catchError, Observable, of, switchMap } from 'rxjs';
import { UserService } from '../user/user.service';
import { IUser } from '../types/models.interface';

@Injectable({ providedIn: 'root' })
export class AuthService implements OnInit {
  accessToken: string;
  private _authenticated: boolean = false;
  private _httpClient = inject(HttpClient);
  private _userService = inject(UserService);

  ngOnInit(): void {
    this.accessToken = '';
  }

  forgotPassword(email: string): Observable<{ data: IUser }> {
    return this._httpClient.post<{ data: IUser }>('api/auth/forgot-password', email);
  }

  resetPassword(password: string): Observable<{ data: IUser }> {
    return this._httpClient.post<{ data: IUser }>('api/auth/reset-password', password);
  }

  signIn(credentials: { email: string; password: string }): Observable<{ access_token: string }> {
    return this._httpClient.post<{ access_token: string }>('auth/sign-in', credentials).pipe(
      switchMap((res) => {
        this.accessToken = res.access_token;
        this._authenticated = true;
        return of(res);
      })
    );
  }

  signInUsingToken(): Observable<any> {
    return this._httpClient
      .post('auth/sign-in-with-token', {
        accessToken: this.accessToken
      })
      .pipe(
        catchError(() => of(false)),
        switchMap((response: any) => {
          if (response.accessToken) {
            this.accessToken = response.accessToken;
          }
          this._authenticated = true;
          this._userService.user = response.user;
          return of(true);
        })
      );
  }

  signOut(): Observable<boolean> {
    localStorage.removeItem('accessToken');
    this._authenticated = false;
    return of(true);
  }

  signUp(user: { name: string; email: string; password: string; company: string }): Observable<any> {
    return this._httpClient.post('api/auth/sign-up', user);
  }

  unlockSession(credentials: { email: string; password: string }): Observable<any> {
    return this._httpClient.post('api/auth/unlock-session', credentials);
  }

  check(): Observable<boolean> {
    if (this._authenticated) return of(true);
    if (!this.accessToken) return of(false);
    return this.signInUsingToken();
  }
}

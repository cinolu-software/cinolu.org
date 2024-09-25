import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AuthService } from '../../auth.service';
import { IResetPasswordStore } from './types/reset-password-store.type';
import { Observable, switchMap, tap } from 'rxjs';
import { IResetPassword } from './types/reset-password.type';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordStore extends ComponentStore<IResetPasswordStore> {
  state$ = this.state$;
  private _authService = inject(AuthService);
  private _router = inject(Router);

  constructor() {
    super({ isLoading: false, error: null, success: null });
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  setError = this.updater((state, error: string | null) => ({ ...state, error }));
  setSuccess = this.updater((state, success: string | null) => ({ ...state, success }));

  resetPassword = this.effect((payload$: Observable<IResetPassword>) =>
    payload$.pipe(
      tap(() => this.setIsLoading(true)),
      switchMap((payload) =>
        this._authService.resetPassword(payload).pipe(
          tapResponse({
            next: () => this._router.navigate(['/sign-in']),
            error: (error: HttpErrorResponse) => this.setError(error.error.message),
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );
}

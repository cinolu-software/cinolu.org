import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { AuthService } from '../../auth.service';
import { Observable, switchMap, tap } from 'rxjs';
import { ISignUp } from './types/sign-up.type';
import { tapResponse } from '@ngrx/operators';
import { ISignupStore } from './types/sign-up-store.type';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SignupStore extends ComponentStore<ISignupStore> {
  state$ = this.state$;
  private _authService = inject(AuthService);
  private _router = inject(Router);

  constructor() {
    super({ isLoading: false, error: null });
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  setError = this.updater((state, error: string | null) => ({ ...state, error }));

  signUp = this.effect((payload$: Observable<ISignUp>) =>
    payload$.pipe(
      tap(() => this.setIsLoading(true)),
      switchMap((payload) =>
        this._authService.signUp(payload).pipe(
          tapResponse({
            next: () =>
              this._router.navigate(['/confirmation-required'], {
                queryParams: { email: payload.email }
              }),
            error: (error: HttpErrorResponse) => this.setError(error.error.message),
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );
}

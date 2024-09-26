import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { IConfirmationRequiredStore } from './types/confirmation-required-store.type';
import { AuthService } from '../../auth.service';
import { Observable, switchMap, tap } from 'rxjs';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationRequiredStore extends ComponentStore<IConfirmationRequiredStore> {
  state$ = this.state$;
  private _authService = inject(AuthService);

  constructor() {
    super({ isLoading: false, error: null, sucess: null });
  }

  setIsLoading = this.updater((state, isLoading: boolean) => ({ ...state, isLoading }));
  setError = this.updater((state, error: string | null) => ({ ...state, error }));
  setSucess = this.updater((state, sucess: string | null) => ({ ...state, sucess }));

  resendEmailVerification = this.effect((payload$: Observable<string>) =>
    payload$.pipe(
      tap(() => this.setIsLoading(true)),
      switchMap((payload) =>
        this._authService.resendEmailVerification(payload).pipe(
          tapResponse({
            next: () => this.setSucess('Un email de vérification a été envoyé à votre adresse email.'),
            error: (error: HttpErrorResponse) => this.setError(error.error.message),
            finalize: () => this.setIsLoading(false)
          })
        )
      )
    )
  );
}

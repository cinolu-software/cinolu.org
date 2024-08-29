import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { IAccountStore } from '../types/account-store.interface';
import { IAPIValidationError } from 'app/core/types/api-validation-error.interface';
import { map, mergeMap, Observable, tap } from 'rxjs';
import { IInfoPayload } from '../types/info-payload.interface';
import { AccountService } from '../account.service';
import { tapResponse } from '@ngrx/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { ISecurityPayload } from '../types/securirty-payload.interface';
import { authActions } from 'app/core/auth/data-access/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AccountStore extends ComponentStore<IAccountStore> {
  state$: Observable<IAccountStore> = this.select((state) => state);
  private _accountService = inject(AccountService);

  constructor() {
    super({
      infoIsLoading: false,
      infoError: null,
      infoErrors: [],
      infoSuccess: null,
      securityIsLoading: false,
      securityError: null,
      securityErrors: [],
      securitySuccess: null
    });
  }

  private _setInfoLoading = this.updater((state, infoIsLoading: boolean) => ({ ...state, infoIsLoading }));
  private _setInfoError = this.updater((state, infoError: string) => ({ ...state, infoError }));
  private _setInfoErrors = this.updater((state, infoErrors: IAPIValidationError[]) => ({ ...state, infoErrors }));
  private _setSecurityLoading = this.updater((state, securityIsLoading: boolean) => ({ ...state, securityIsLoading }));
  private _setSecurityError = this.updater((state, securityError: string) => ({ ...state, securityError }));
  private _setSecurityErrors = this.updater((state, securityErrors: IAPIValidationError[]) => ({
    ...state,
    securityErrors
  }));
  private _setInfoSuccess = this.updater((state, infoSuccess: string) => ({ ...state, infoSuccess }));
  private _setSecuritySuccess = this.updater((state, securitySuccess: string) => ({ ...state, securitySuccess }));

  $updateInfo = this.effect((payloas$: Observable<IInfoPayload>) =>
    payloas$.pipe(
      tap(() => this._setInfoLoading(true)),
      mergeMap((payload) =>
        this._accountService.updateInfo(payload).pipe(
          tapResponse({
            next: (user) => {
              this._setInfoSuccess('Le profil a été mis à jour avec succès');
              authActions.authenticateUser({ user });
            },
            error: (error: HttpErrorResponse) => {
              const message = error.error.message;
              if (typeof message === 'string') this._setInfoError(message);
              else this._setInfoErrors(message);
            },
            finalize: () => this._setInfoLoading(false)
          })
        )
      )
    )
  );

  $updateSecurity = this.effect((payload$: Observable<ISecurityPayload>) =>
    payload$.pipe(
      tap(() => this._setSecurityLoading(true)),
      mergeMap((payload) =>
        this._accountService.updatePassword(payload).pipe(
          tapResponse({
            next: (user) => {
              this._setSecuritySuccess('Le mot de passe a été mis à jour avec succès');
              authActions.authenticateUser({ user });
            },
            error: (error: HttpErrorResponse) => {
              const message = error.error.message;
              if (typeof message === 'string') this._setSecurityError(message);
              else this._setSecurityErrors(message);
            },
            finalize: () => this._setSecurityLoading(false)
          })
        )
      )
    )
  );
}

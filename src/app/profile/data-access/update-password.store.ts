import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { IUser } from '../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { IUpdatePasswordPayload } from '../utils/types/update-password.type';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '../../shared/services/toast/toastr.service';
import { AuthStore } from '../../shared/store/auth.store';

interface IUpdatePasswordStore {
  isLoading: boolean;
}

export const UpdatePasswordStore = signalStore(
  withState<IUpdatePasswordStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    authStore: inject(AuthStore)
  })),
  withMethods(({ _http, _toast, authStore, ...store }) => ({
    updatePassword: rxMethod<IUpdatePasswordPayload>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((payload) => {
          return _http.patch<{ data: IUser }>('auth/update-password', payload).pipe(
            tap((res) => {
              _toast.showSuccess('Mot de passe mis à jour');
              patchState(store, { isLoading: false });
              authStore.setUser(res.data);
            }),
            catchError(() => {
              _toast.showError('Erreur lors de la mise à jour du mot de passe');
              patchState(store, { isLoading: false });
              return of();
            })
          );
        })
      )
    )
  }))
);

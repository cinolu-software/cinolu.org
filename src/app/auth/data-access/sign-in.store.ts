import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ISignInPayload } from '../utils/types/sign-in.type';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { AuthStore } from '../../shared/store/auth.store';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '../../shared/services/toast/toastr.service';
import { Router } from '@angular/router';
import { IUser } from '../../shared/utils/types/models.type';

interface ISignInStore {
  isLoading: boolean;
}

export const SignInStore = signalStore(
  withState<ISignInStore>({
    isLoading: false
  }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _router: inject(Router),
    authStore: inject(AuthStore)
  })),
  withMethods(({ _http, _toast, _router, ...store }) => ({
    signIn: rxMethod<ISignInPayload>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((payload) => {
          return _http.post<{ data: IUser }>('auth/sign-in', payload).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false });
              store.authStore.setUser(data);
              _toast.showSuccess('Connexion réussie');
              _router.navigate(['/profile']);
            }),
            catchError((err) => {
              patchState(store, { isLoading: false });
              _toast.showError(err.error['message'] || 'Erreur de connexion');
              return of(null);
            })
          );
        })
      )
    )
  }))
);

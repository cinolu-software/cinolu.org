import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '@core/services/toast/toastr.service';
import { IUser } from '@shared/models/entities.models';
import { SignInDto } from '../dto/sign-in.dto';
import { AuthStore } from '@core/auth/auth.store';
import { environment } from '@environments/environment';
import { Router } from '@angular/router';

interface ISignInStore {
  isLoading: boolean;
}

interface ISignInParams {
  payload: SignInDto;
  onSuccess: () => void;
}

export const SignInStore = signalStore(
  withState<ISignInStore>({
    isLoading: false
  }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _authStore: inject(AuthStore),
    _router: inject(Router)
  })),
  withMethods(({ _http, _toast, _authStore, _router, ...store }) => ({
    signIn: rxMethod<ISignInParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ payload, onSuccess }) => {
          return _http.post<{ data: IUser }>('auth/sign-in', payload).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false });
              _authStore.setUser(data);
              _toast.showSuccess('Connexion réussie');

              const userRoles = data.roles.map((role) => (typeof role === 'string' ? role : role.name));

              setTimeout(() => {
                if (userRoles.includes('user')) {
                  _router.navigate(['/dashboard']);
                } else if (userRoles.includes('admin') || userRoles.includes('staff')) {
                  window.location.href = environment.onestopUrl;
                } else {
                  _router.navigate(['/']);
                }
              }, 100);

              onSuccess();
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

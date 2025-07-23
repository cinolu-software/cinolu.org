import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { IUser } from '../../shared/models/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, catchError, of, exhaustMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from '../../core/services/toast/toastr.service';

interface IAuthStore {
  user: IUser | null;
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<IAuthStore>({ user: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _router: inject(Router),
    _toast: inject(ToastrService)
  })),
  withMethods(({ _http, _router, _toast, ...store }) => ({
    getProfile: rxMethod<void>(
      pipe(
        exhaustMap(() =>
          _http.get<{ data: IUser }>('auth/dashboard').pipe(
            tap(({ data }) => patchState(store, { user: data })),
            catchError(() => {
              patchState(store, { user: null });
              return of(null);
            })
          )
        )
      )
    ),
    signOut: rxMethod<void>(
      pipe(
        exhaustMap(() =>
          _http.post<void>('auth/sign-out', {}).pipe(
            tap(() => {
              _router.navigate(['/sign-in']);
              _toast.showSuccess('Déconnexion réussie');
              patchState(store, { user: null });
            }),
            catchError(() => {
              _toast.showError('Erreur lors de la déconnexion');
              return of(null);
            })
          )
        )
      )
    ),
    setUser: (user: IUser | null) => patchState(store, { user })
  }))
);

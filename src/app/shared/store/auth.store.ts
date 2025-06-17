import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import { IUser } from '../../shared/utils/types/models.type';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

interface IAuthStore {
  user: IUser | null;
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<IAuthStore>({
    user: null
  }),
  withMethods((store, http = inject(HttpClient)) => ({
    getProfile: rxMethod<void>(
      pipe(
        exhaustMap(() => {
          return http.get<{ data: IUser }>('auth/profile').pipe(
            tap(({ data }) => patchState(store, { user: data })),
            catchError(() => {
              patchState(store, { user: null });
              return of(null);
            })
          );
        })
      )
    ),
    setUser: (user: IUser | null) => patchState(store, { user })
  }))
);

import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ISignInPayload } from '../utils/types/sign-in.type';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { AuthStore } from '../../shared/store/auth.store';

interface ISignInStore {
  isLoading: boolean;
}

export const SignInStore = signalStore(
  withState<ISignInStore>({
    isLoading: false
  }),
  withMethods((store, authService = inject(AuthService), authStore = inject(AuthStore)) => ({
    signIn: rxMethod<{ payload: ISignInPayload; redirectUrl: string }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((params) => {
          return authService.signIn(params.payload, params.redirectUrl).pipe(
            map((user) => {
              patchState(store, { isLoading: false });
              authStore.setUser(user);
              return user;
            }),
            catchError(() => {
              patchState(store, { isLoading: false });
              authStore.setUser(null);
              return of();
            })
          );
        })
      )
    )
  }))
);

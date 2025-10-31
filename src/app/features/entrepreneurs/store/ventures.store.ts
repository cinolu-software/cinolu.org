import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { IVenture } from '../../../shared/models';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, catchError, of, exhaustMap } from 'rxjs';

interface IVenturesStore {
  isLoading: boolean;
  ventures: IVenture[];
}

export const VenturesStore = signalStore(
  withState<IVenturesStore>({ isLoading: false, ventures: [] }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadVentures: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        exhaustMap(() => {
          return http.get<{ data: IVenture[] }>('ventures/published').pipe(
            tap(({ data }) => patchState(store, { isLoading: false, ventures: data })),
            catchError(() => {
              patchState(store, { isLoading: false, ventures: [] });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, catchError, of, exhaustMap } from 'rxjs';
import { IVenture } from '../../../../../shared/models/entities.models';

interface IVenturesStore {
  isLoading: boolean;
  ventures: [IVenture[], number];
}

export const VenturesStore = signalStore(
  withState<IVenturesStore>({ isLoading: false, ventures: [[], 0] }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadVentures: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        exhaustMap(() => {
          return http.get<{ data: [IVenture[], number] }>('ventures').pipe(
            tap(({ data }) => {
              const [ventures, total] = data;
              patchState(store, { isLoading: false, ventures: [ventures, total] });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, ventures: [[], 0] });
              return of(null);
            }),
          );
        }),
      ),
    ),
  })),
);

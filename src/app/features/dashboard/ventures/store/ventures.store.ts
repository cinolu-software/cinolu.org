import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, catchError, of, switchMap } from 'rxjs';
import { IEnterprise } from '../../../../shared/models/entities.models';
import { buildQueryParams } from '../../../../shared/helpers/build-query-params';
import { FilterVenturesDto } from '../dto/filter-venture.dto';

interface IVenturesStore {
  isLoading: boolean;
  ventures: [IEnterprise[], number];
}

export const VenturesStore = signalStore(
  withState<IVenturesStore>({ isLoading: false, ventures: [[], 0] }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    loadVentures: rxMethod<FilterVenturesDto>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          return _http.get<{ data: [IEnterprise[], number] }>('ventures/by-user', { params }).pipe(
            tap(({ data }) => patchState(store, { isLoading: false, ventures: data })),
            catchError(() => {
              patchState(store, { isLoading: false, ventures: [[], 0] });
              return of([]);
            })
          );
        })
      )
    ),
    deleteVenture: (id: string) => {
      const [ventures, total] = store.ventures();
      const updatedVentures = ventures.filter((venture) => venture.id !== id);
      patchState(store, { ventures: [updatedVentures, total - 1] });
    }
  }))
);

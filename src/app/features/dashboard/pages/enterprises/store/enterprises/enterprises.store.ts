import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, catchError, of, switchMap } from 'rxjs';
import { EnterprisesQueryParams } from '../../dto/query-params.dto';
import { buildQueryParams } from '../../../../../../shared/helpers/build-query-params';
import { IEnterprise } from '../../../../../../shared/models/entities';

interface IEnterprisesStore {
  isLoading: boolean;
  enterprises: [IEnterprise[], number];
}

export const EnterprisesStore = signalStore(
  withState<IEnterprisesStore>({ isLoading: false, enterprises: [[], 0] }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    loadEnterprises: rxMethod<EnterprisesQueryParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          return _http.get<{ data: [IEnterprise[], number] }>('enterprises/by-user', { params }).pipe(
            tap(({ data }) => patchState(store, { isLoading: false, enterprises: data })),
            catchError(() => {
              patchState(store, { isLoading: false, enterprises: [[], 0] });
              return of([]);
            })
          );
        })
      )
    )
  }))
);

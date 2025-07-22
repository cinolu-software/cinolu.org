import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, catchError, of, switchMap } from 'rxjs';
import { IEnterprise } from '../../../shared/utils/types/models.type';
import { QueryParams } from '../../utils/types/enterprises/query-params.type';
import { buildQueryParams } from '../../../shared/utils/helpers/build-query-params.fn';

interface IEnterprisesStore {
  isLoading: boolean;
  enterprises: [IEnterprise[], number];
}

export const EnterprisesStore = signalStore(
  withState<IEnterprisesStore>({ isLoading: false, enterprises: [[], 0] }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadEnterprises: rxMethod<QueryParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          return http.get<{ data: [IEnterprise[], number] }>('enterprises/by-user', { params }).pipe(
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

import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, exhaustMap, catchError, of } from 'rxjs';
import { IEnterprise } from '../../shared/utils/types/models.type';

interface IEnterprisesStore {
  isLoading: boolean;
  enterprises: [IEnterprise[], number];
}

export const EnterprisesStore = signalStore(
  withState<IEnterprisesStore>({ isLoading: false, enterprises: [[], 0] }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadEnterprises: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        exhaustMap(() => {
          return http.get<{ data: [IEnterprise[], number] }>('enterprises/by-user').pipe(
            tap(({ data }) => patchState(store, { isLoading: false, enterprises: data })),
            catchError(() => {
              patchState(store, { isLoading: false, enterprises: [[], 0] });
              return of([]);
            })
          );
        })
      )
    )
  })),
  withHooks({
    onInit: ({ loadEnterprises }) => {
      loadEnterprises();
    }
  })
);

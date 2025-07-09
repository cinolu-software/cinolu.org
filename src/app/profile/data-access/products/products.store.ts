import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, catchError, of, switchMap } from 'rxjs';
import { IProduct } from '../../../shared/utils/types/models.type';
import { QueryParams } from '../../utils/types/products/query-params.type';
import { buildQueryParams } from '../../../shared/utils/helpers/build-query-params.fn';

interface IProductsStore {
  isLoading: boolean;
  products: [IProduct[], number];
}

interface ILoadProductsParams {
  enterpriseId: string | undefined;
  queryParams: QueryParams;
}

export const ProductsStore = signalStore(
  withState<IProductsStore>({ isLoading: false, products: [[], 0] }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadProducts: rxMethod<ILoadProductsParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((params) => {
          return http
            .get<{ data: [IProduct[], number] }>(`products/enterprise/${params.enterpriseId}`, {
              params: buildQueryParams(params.queryParams)
            })
            .pipe(
              tap(({ data }) => patchState(store, { isLoading: false, products: data })),
              catchError(() => {
                patchState(store, { isLoading: false, products: [[], 0] });
                return of([]);
              })
            );
        })
      )
    )
  }))
);

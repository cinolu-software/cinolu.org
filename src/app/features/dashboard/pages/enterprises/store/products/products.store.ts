import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, catchError, of, switchMap } from 'rxjs';
import { buildQueryParams } from '../../../../../../shared/helpers/build-query-params';
import { IProduct } from '../../../../../../shared/models/entities';
import { QueryParams } from '../../../../dto/query-params.dto';

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
        switchMap(({ enterpriseId, queryParams }) => {
          const params = buildQueryParams(queryParams);
          return http.get<{ data: [IProduct[], number] }>(`products/enterprise/${enterpriseId}`, { params }).pipe(
            tap(({ data }) => patchState(store, { isLoading: false, products: data })),
            catchError(() => {
              patchState(store, { isLoading: false, products: [[], 0] });
              return of([]);
            })
          );
        })
      )
    ),
    addProduct: (product: IProduct): void => {
      const currentProducts = store.products()[0];
      const countProducts = store.products()[1];
      patchState(store, { products: [[...currentProducts, product], countProducts + 1] });
    },
    updateProduct: (product: IProduct): void => {
      const currentProducts = store.products()[0];
      const updatedProducts = currentProducts.map((p) => (p.id === product.id ? product : p));
      patchState(store, { products: [updatedProducts, store.products()[1]] });
    },
    deleteProduct: (productId: string): void => {
      const currentProducts = store.products()[0];
      const updatedProducts = currentProducts.filter((p) => p.id !== productId);
      patchState(store, { products: [updatedProducts, store.products()[1] - 1] });
    }
  }))
);

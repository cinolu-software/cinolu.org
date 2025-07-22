import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { IProduct } from '../../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '../../../shared/services/toast/toastr.service';
import { IProductPayload } from '../../utils/types/products/add-product.type';
import { ActivatedRoute } from '@angular/router';
import { ProductsStore } from './products.store';

interface IUpdateProducttore {
  isLoading: boolean;
}

interface IUpdateProductParams {
  enterpriseId: string;
  productId: string;
  payload: IProductPayload;
}

export const UpdateProducttore = signalStore(
  withState<IUpdateProducttore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _route: inject(ActivatedRoute),
    _productsStore: inject(ProductsStore)
  })),
  withMethods(({ _http, _toast, _route, _productsStore, ...store }) => ({
    updateProduct: rxMethod<IUpdateProductParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((params) => {
          return _http.patch<{ data: IProduct }>(`products/${params.productId}`, params.payload).pipe(
            tap(() => {
              const queryParams = {
                page: _route.snapshot.queryParams['page'] || null
              };
              _productsStore.loadProducts({ enterpriseId: params.enterpriseId, queryParams });
              patchState(store, { isLoading: false });
              _toast.showSuccess('Produit mise à jour');
            }),
            catchError(() => {
              patchState(store, { isLoading: false });
              _toast.showError('Erreur lors de la mise à jour');
              return of(null);
            })
          );
        })
      )
    )
  }))
);

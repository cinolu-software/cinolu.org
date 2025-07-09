import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '../../../shared/services/toast/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { ProductsStore } from './products.store';

interface IDeleteProductStore {
  isLoading: boolean;
}

interface IDeleteProductParams {
  enterpriseId: string;
  productId: string;
}

export const DeleteProductStore = signalStore(
  withState<IDeleteProductStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _route: inject(ActivatedRoute),
    _productsStore: inject(ProductsStore)
  })),
  withMethods(({ _http, _toast, _route, _productsStore, ...store }) => ({
    deleteProduct: rxMethod<IDeleteProductParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((params) => {
          return _http.delete(`products/${params.productId}`).pipe(
            tap(() => {
              patchState(store, { isLoading: false });
              const queryParams = {
                page: _route.snapshot.queryParams['page'] || null
              };
              _productsStore.loadProducts({ enterpriseId: params.enterpriseId, queryParams });
              _toast.showSuccess('Produit supprimée');
            }),
            catchError(() => {
              patchState(store, { isLoading: false });
              _toast.showError('Erreur lors de la suppression');
              return of(null);
            })
          );
        })
      )
    )
  }))
);

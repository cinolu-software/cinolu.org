import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProductsStore } from './products.store';
import { ToastrService } from '../../../../core/services/toast/toastr.service';

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
    _productsStore: inject(ProductsStore)
  })),
  withMethods(({ _http, _toast, _productsStore, ...store }) => ({
    deleteProduct: rxMethod<IDeleteProductParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((params) => {
          return _http.delete(`products/${params.productId}`).pipe(
            map(() => {
              patchState(store, { isLoading: false });
              _productsStore.deleteProduct(params.productId);
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

import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProductPayload } from '../../utils/types/products/add-product.type';
import { ProductsStore } from './products.store';
import { ToastrService } from '../../../../core/services/toast/toastr.service';
import { IProduct } from '../../../../shared/models/entities';

interface IUpdateProducttore {
  isLoading: boolean;
}

interface IUpdateProductParams {
  productId: string;
  payload: IProductPayload;
  onSuccess: () => void;
}

export const UpdateProducttore = signalStore(
  withState<IUpdateProducttore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _productsStore: inject(ProductsStore)
  })),
  withMethods(({ _http, _toast, _productsStore, ...store }) => ({
    updateProduct: rxMethod<IUpdateProductParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ productId, payload, onSuccess }) => {
          return _http.patch<{ data: IProduct }>(`products/${productId}`, payload).pipe(
            tap(({ data }) => {
              _productsStore.updateProduct(data);
              _toast.showSuccess('Produit mise à jour');
              patchState(store, { isLoading: false });
              onSuccess();
            }),
            catchError(() => {
              _toast.showError('Erreur lors de la mise à jour');
              patchState(store, { isLoading: false });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

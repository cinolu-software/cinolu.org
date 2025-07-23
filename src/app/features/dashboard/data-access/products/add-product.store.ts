import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProductPayload } from '../../utils/types/products/add-product.type';
import { ProductsStore } from './products.store';
import { ToastrService } from '../../../../core/services/toast/toastr.service';
import { IProduct } from '../../../../shared/models/entities';

interface IAddProductStore {
  isLoading: boolean;
}

interface IAddProductParams {
  payload: IProductPayload;
  onSuccess: () => void;
}

export const AddProductStore = signalStore(
  withState<IAddProductStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _productsStore: inject(ProductsStore),
    _toast: inject(ToastrService)
  })),
  withMethods(({ _http, _productsStore, _toast, ...store }) => ({
    addProduct: rxMethod<IAddProductParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ payload, onSuccess }) => {
          return _http.post<{ data: IProduct }>('products', payload).pipe(
            map(({ data }) => {
              _productsStore.addProduct(data);
              _toast.showSuccess('Produit ajouté');
              patchState(store, { isLoading: false });
              onSuccess();
            }),
            catchError(() => {
              patchState(store, { isLoading: false });
              _toast.showError("Erreur lors de l'ajout");
              return of(null);
            })
          );
        })
      )
    )
  }))
);

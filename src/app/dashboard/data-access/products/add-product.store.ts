import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { IProduct } from '../../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '../../../shared/services/toast/toastr.service';
import { IProductPayload } from '../../utils/types/products/add-product.type';
import { ProductsStore } from './products.store';
import { QueryParams } from '../../utils/types/products/query-params.type';

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
    _toast: inject(ToastrService)
  })),
  withMethods(({ _http, _toast, ...store }) => ({
    addProduct: rxMethod<IAddProductParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ payload, onSuccess }) => {
          return _http.post<{ data: IProduct }>('products', payload).pipe(
            tap(() => {
              patchState(store, { isLoading: false });
              _toast.showSuccess('Produit ajouté');
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

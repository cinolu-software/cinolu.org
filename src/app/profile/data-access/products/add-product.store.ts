import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { IProduct } from '../../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '../../../shared/services/toast/toastr.service';
import { IProductPayload } from '../../utils/types/products/add-product.type';

interface IAddProductStore {
  isLoading: boolean;
}

export const AddProductStore = signalStore(
  withState<IAddProductStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService)
  })),
  withMethods(({ _http, _toast, ...store }) => ({
    addProduct: rxMethod<IProductPayload>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((payload) => {
          return _http.post<{ data: IProduct }>('products', payload).pipe(
            tap(() => {
              patchState(store, { isLoading: false });
              _toast.showSuccess('Produit ajouté');
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

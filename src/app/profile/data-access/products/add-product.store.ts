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

interface IAddProductStore {
  isLoading: boolean;
}

export const AddProductStore = signalStore(
  withState<IAddProductStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _route: inject(ActivatedRoute),
    _productsStore: inject(ProductsStore)
  })),
  withMethods(({ _http, _toast, _route, _productsStore, ...store }) => ({
    addProduct: rxMethod<IProductPayload>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((payload) => {
          return _http.post<{ data: IProduct }>('products', payload).pipe(
            tap(() => {
              patchState(store, { isLoading: false });
              const queryParams = {
                page: _route.snapshot.queryParams['page'] || null
              };
              _productsStore.loadProducts({ enterpriseId: payload.enterpriseId, queryParams });
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

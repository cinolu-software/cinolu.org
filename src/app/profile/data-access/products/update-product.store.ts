import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { IProduct } from '../../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '../../../shared/services/toast/toastr.service';
import { IProductPayload } from '../../utils/types/products/add-product.type';

interface IUpdateProducttore {
  isLoading: boolean;
}

export const UpdateProducttore = signalStore(
  withState<IUpdateProducttore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService)
  })),
  withMethods(({ _http, _toast, ...store }) => ({
    updateProduct: rxMethod<{ id: string; payload: IProductPayload }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((params) => {
          return _http.patch<{ data: IProduct }>(`products/${params.id}`, params.payload).pipe(
            tap(() => {
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

import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '../../../shared/services/toast/toastr.service';

interface IDeleteProductStore {
  isLoading: boolean;
}

export const DeleteProductStore = signalStore(
  withState<IDeleteProductStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService)
  })),
  withMethods(({ _http, _toast, ...store }) => ({
    deleteProduct: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => {
          return _http.delete(`products/${id}`).pipe(
            tap(() => {
              patchState(store, { isLoading: false });
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

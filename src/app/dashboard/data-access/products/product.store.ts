import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { IProduct } from '../../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface IProductStore {
  isLoading: boolean;
  product: IProduct | null;
}

export const ProductStore = signalStore(
  withState<IProductStore>({ isLoading: false, product: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _route: inject(ActivatedRoute)
  })),
  withMethods(({ _http, ...store }) => ({
    loadProduct: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, product: null })),
        switchMap((id) => {
          return _http.get<{ data: IProduct }>(`products/${id}`).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, product: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, product: null });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

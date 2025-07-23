import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CategoriesStore } from './categories.store';
import { ICategory } from '../../../../../../shared/models/entities';

interface IUpdateCategoryStore {
  isLoading: boolean;
}

interface IUpdateCategoryParams {
  id: string;
  payload: ICategory;
  onSuccess: () => void;
}

export const UpdateCategoryStore = signalStore(
  withState<IUpdateCategoryStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _categoriesStore: inject(CategoriesStore)
  })),
  withMethods(({ _http, _categoriesStore, ...store }) => ({
    updateCategory: rxMethod<IUpdateCategoryParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ id, payload, onSuccess }) => {
          return _http.patch<{ data: ICategory }>(`project-categories/${id}`, payload).pipe(
            map(({ data }) => {
              _categoriesStore.updateCategory(data);
              patchState(store, { isLoading: false });
              onSuccess();
            }),
            catchError(() => {
              patchState(store, { isLoading: false });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

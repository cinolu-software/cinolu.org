import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, of, tap } from 'rxjs';
import { ICategory } from '../../shared/utils/types/models.type';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

interface ICategoriesStore {
  isLoading: boolean;
  error: string | null;
  categories: ICategory[];
}

export const EventCategoriesStore = signalStore(
  withState<ICategoriesStore>({
    isLoading: false,
    error: null,
    categories: []
  }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadCategories: rxMethod<void>(() => {
      return http.get<{ data: ICategory[] }>('event-categories').pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        map(({ data }) => patchState(store, { isLoading: false, categories: data, error: null })),
        catchError((error) => {
          patchState(store, { isLoading: false, error: error['message'], categories: [] });
          return of();
        })
      );
    })
  }))
);

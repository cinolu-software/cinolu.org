import { patchState, signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICategory } from '../../../shared/utils/types/models.type';
import { ActivatedRoute } from '@angular/router';
import { QueryParams } from '../../utils/types/query-params.type';
import { buildQueryParams } from '../../../shared/utils/helpers/build-query-params.fn';

interface IDashboardProjectCategoriesStore {
  isLoading: boolean;
  isFiltering: boolean;
  categories: [ICategory[], number];
}

export const DashboardProjectCategoriesStore = signalStore(
  withState<IDashboardProjectCategoriesStore>({ isLoading: false, isFiltering: false, categories: [[], 0] }),
  withProps(() => ({
    _http: inject(HttpClient),
    _route: inject(ActivatedRoute)
  })),
  withMethods(({ _http, ...store }) => ({
    loadCategories: rxMethod<QueryParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          if (queryParams.page || queryParams.q) patchState(store, { isFiltering: true });
          return _http.get<{ data: [ICategory[], number] }>('project-categories/paginated', { params }).pipe(
            map(({ data }) => {
              patchState(store, { isLoading: false, isFiltering: false, categories: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, isFiltering: false, categories: [[], 0] });
              return of(null);
            })
          );
        })
      )
    )
  })),
  withHooks({
    onInit({ loadCategories, _route }) {
      const queryParams = {
        page: _route.snapshot.queryParamMap.get('page'),
        q: _route.snapshot.queryParamMap.get('q')
      };
      loadCategories(queryParams);
    }
  })
);

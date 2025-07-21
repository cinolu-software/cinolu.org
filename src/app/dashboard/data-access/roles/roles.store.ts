import { patchState, signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QueryParams } from '../../utils/types/query-params.type';
import { ActivatedRoute } from '@angular/router';
import { buildQueryParams } from '../../../shared/utils/helpers/build-query-params.fn';
import { IRole } from '../../../shared/utils/types/models.type';

interface IDashboardRolesStore {
  isLoading: boolean;
  isFiltering: boolean;
  roles: [IRole[], number];
}

export const DashboardRolesStore = signalStore(
  withState<IDashboardRolesStore>({ isLoading: false, isFiltering: false, roles: [[], 0] }),
  withProps(() => ({
    _http: inject(HttpClient),
    _route: inject(ActivatedRoute)
  })),
  withMethods(({ _http, ...store }) => ({
    loadRoles: rxMethod<QueryParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          if (queryParams.page || queryParams.q) patchState(store, { isFiltering: true });
          return _http.get<{ data: [IRole[], number] }>('roles/paginated', { params }).pipe(
            map(({ data }) => {
              patchState(store, { isLoading: false, isFiltering: false, roles: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, isFiltering: false, roles: [[], 0] });
              return of(null);
            })
          );
        })
      )
    )
  })),
  withHooks({
    onInit({ loadRoles, _route }) {
      const queryParams = {
        page: _route.snapshot.queryParamMap.get('page'),
        q: _route.snapshot.queryParamMap.get('q')
      };
      loadRoles(queryParams);
    }
  })
);

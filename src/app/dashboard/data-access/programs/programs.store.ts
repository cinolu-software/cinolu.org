import { patchState, signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QueryParams } from '../../utils/types/query-params.type';
import { ActivatedRoute } from '@angular/router';
import { buildQueryParams } from '../../../shared/utils/helpers/build-query-params.fn';
import { IProject } from '../../../shared/utils/types/models.type';

interface IDashboardProgramsStore {
  isLoading: boolean;
  isFiltering: boolean;
  programs: [IProject[], number];
}

export const DashboardProgramsStore = signalStore(
  withState<IDashboardProgramsStore>({ isLoading: false, isFiltering: false, programs: [[], 0] }),
  withProps(() => ({
    _http: inject(HttpClient),
    _route: inject(ActivatedRoute)
  })),
  withMethods(({ _http, ...store }) => ({
    loadPrograms: rxMethod<QueryParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          if (queryParams.page || queryParams.q) patchState(store, { isFiltering: true });
          return _http.get<{ data: [IProject[], number] }>('programs', { params }).pipe(
            map(({ data }) => {
              patchState(store, { isLoading: false, isFiltering: false, programs: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, isFiltering: false, programs: [[], 0] });
              return of(null);
            })
          );
        })
      )
    )
  })),
  withHooks({
    onInit({ loadPrograms, _route }) {
      const queryParams = {
        page: _route.snapshot.queryParamMap.get('page'),
        q: _route.snapshot.queryParamMap.get('q')
      };
      loadPrograms(queryParams);
    }
  })
);

import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { FilterProjectCategoriesDto } from '../../dto/filter-categories';
import { IProject } from '../../../../../shared/models/entities';
import { buildQueryParams } from '../../../../../shared/helpers/build-query-params';

interface IProjectsStore {
  isLoading: boolean;
  isFiltering: boolean;
  projects: [IProject[], number];
}

export const ProjectsStore = signalStore(
  withState<IProjectsStore>({ isLoading: false, isFiltering: false, projects: [[], 0] }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    loadProjects: rxMethod<FilterProjectCategoriesDto>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          if (queryParams.page || queryParams.q) patchState(store, { isFiltering: true });
          return _http.get<{ data: [IProject[], number] }>('projects', { params }).pipe(
            map(({ data }) => {
              patchState(store, { isLoading: false, isFiltering: false, projects: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, isFiltering: false, projects: [[], 0] });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

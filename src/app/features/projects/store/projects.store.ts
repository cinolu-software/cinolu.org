import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { buildQueryParams } from '../../../shared/helpers/build-query-params';
import { IProject } from '../../../shared/models/entities.models';
import { FilterProjectsDto } from '../dto/filter-projects.dto';

interface IProjectsStore {
  isLoading: boolean;
  projects: [IProject[], number];
}

export const ProjectsStore = signalStore(
  withState<IProjectsStore>({ isLoading: false, projects: [[], 0] }),
  withProps(() => ({
    _http: inject(HttpClient),
  })),
  withMethods((store, http = inject(HttpClient)) => ({
    loadProjects: rxMethod<FilterProjectsDto>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          return http
            .get<{
              data: [IProject[], number];
            }>('projects/find-published', { params })
            .pipe(
              tap(({ data }) => patchState(store, { isLoading: false, projects: data })),
              catchError(() => {
                patchState(store, { isLoading: false, projects: [[], 0] });
                return of(null);
              }),
            );
        }),
      ),
    ),
  })),
);

import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { IProject } from '../../shared/utils/types/models.type';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { QueryParams } from '../utils/types/query-params.type';
import { buildQueryParams } from '../../shared/utils/helpers/build-query-params.fn';

interface IProjectsStore {
  isLoading: boolean;
  error: string | null;
  projects: [IProject[], number];
}

export const ProjectsStore = signalStore(
  withState<IProjectsStore>({
    isLoading: false,
    error: null,
    projects: [[], 0]
  }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadProjects: rxMethod<QueryParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((params) => {
          return http
            .get<{ data: [IProject[], number] }>('projects/find-published', {
              params: buildQueryParams(params)
            })
            .pipe(
              map(({ data }) => patchState(store, { isLoading: false, projects: data, error: null })),
              catchError((error) => {
                patchState(store, { isLoading: false, error: error['message'], projects: [[], 0] });
                return of(null);
              })
            );
        })
      )
    )
  }))
);

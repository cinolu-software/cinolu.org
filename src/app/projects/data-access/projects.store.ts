import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { IProject } from '../../shared/utils/types/models.type';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { QueryParams } from '../utils/types/query-params.type';
import { buildQueryParams } from '../../shared/utils/helpers/build-query-params.fn';

interface IProjectsStore {
  isLoading: boolean;
  projects: [IProject[], number];
}

export const ProjectsStore = signalStore(
  withState<IProjectsStore>({ isLoading: false, projects: [[], 0] }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadProjects: rxMethod<QueryParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((params) => {
          return http
            .get<{ data: [IProject[], number] }>('projects/find-published', {
              params: buildQueryParams(params)
            })
            .pipe(
              tap(({ data }) => patchState(store, { isLoading: false, projects: data })),
              catchError(() => {
                patchState(store, { isLoading: false, projects: [[], 0] });
                return of(null);
              })
            );
        })
      )
    )
  }))
);

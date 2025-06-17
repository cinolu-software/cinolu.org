import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of, pipe, tap } from 'rxjs';
import { IProject } from '../../shared/utils/types/models.type';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

interface IRecentProjectsStore {
  isLoading: boolean;
  error: string | null;
  projects: IProject[];
}

export const RecentProjectsStore = signalStore(
  withState<IRecentProjectsStore>({
    isLoading: false,
    error: null,
    projects: []
  }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadProjects: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        exhaustMap(() => {
          return http.get<{ data: IProject[] }>('projects/find-recent').pipe(
            map(({ data }) => patchState(store, { isLoading: false, projects: data, error: null })),
            catchError((error) => {
              patchState(store, { isLoading: false, error: error['message'], projects: [] });
              return of([]);
            })
          );
        })
      )
    )
  })),
  withHooks({
    onInit: ({ loadProjects }) => {
      loadProjects();
    }
  })
);

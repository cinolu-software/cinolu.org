import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { IProject } from '../../shared/utils/types/models.type';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

interface IProjectStore {
  isLoading: boolean;
  error: string | null;
  project: IProject | null;
}

export const ProjectStore = signalStore(
  withState<IProjectStore>({
    isLoading: false,
    error: null,
    project: null
  }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadProject: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((slug) => {
          return http.get<{ data: IProject }>(`projects/slug/${slug}`).pipe(
            map(({ data }) => patchState(store, { isLoading: false, project: data, error: null })),
            catchError((error) => {
              patchState(store, { isLoading: false, error: error['message'] });
              return of();
            })
          );
        })
      )
    )
  }))
);

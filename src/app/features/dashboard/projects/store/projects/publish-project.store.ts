import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProject } from '../../../../../shared/models/entities.models';
import { ProjectsStore } from './projects.store';

interface IPublishProjectStore {
  isLoading: boolean;
  projects: IProject | null;
}

export const PublishProjectStore = signalStore(
  withState<IPublishProjectStore>({ isLoading: false, projects: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _projectsStore: inject(ProjectsStore)
  })),
  withMethods(({ _http, _projectsStore, ...store }) => ({
    publishProject: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => {
          return _http.post<{ data: IProject }>(`projects/publish/${id}`, {}).pipe(
            map(({ data }) => {
              _projectsStore.updateProject(data);
              patchState(store, { isLoading: false, projects: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, projects: null });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

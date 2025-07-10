import { signalStore, withState, withMethods, patchState, withProps, withHooks } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { IProject } from '../../shared/utils/types/models.type';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

interface IProjectStore {
  isLoading: boolean;
  project: IProject | null;
}

export const ProjectStore = signalStore(
  withState<IProjectStore>({ isLoading: false, project: null }),
  withProps(() => ({
    _route: inject(ActivatedRoute)
  })),
  withMethods((store, http = inject(HttpClient)) => ({
    loadProject: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((slug) => {
          return http.get<{ data: IProject }>(`projects/slug/${slug}`).pipe(
            tap(({ data }) => patchState(store, { isLoading: false, project: data })),
            catchError(() => {
              patchState(store, { isLoading: false });
              return of(null);
            })
          );
        })
      )
    )
  })),
  withHooks({
    onInit: ({ _route, loadProject }) => {
      const slug = _route.snapshot.params['slug'] || '';
      loadProject(slug);
    }
  })
);

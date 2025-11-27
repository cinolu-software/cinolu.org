import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '@core/services/toast/toastr.service';
import { IResource } from '@shared/models/entities.models';

interface IResourcesStore {
  isLoading: boolean;
  resources: IResource[];
}

export const ProjectResourcesStore = signalStore(
  withState<IResourcesStore>({
    isLoading: false,
    resources: []
  }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService)
  })),
  withMethods(({ _http, _toast, ...store }) => ({
    loadResourcesByPhase: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((phaseId) => {
          return _http.get<{ data: IResource[] }>(`resources/phase/${phaseId}`).pipe(
            map(({ data }) => {
              type MaybeResource = IResource & { phase?: { id: string } };
              const resourcesWithPhase: IResource[] = data.map((r: MaybeResource) => ({
                ...r,
                phase: r.phase ?? { id: phaseId }
              }));
              patchState(store, { isLoading: false, resources: resourcesWithPhase });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, resources: [] });
              _toast.showError('Erreur lors du chargement des ressources');
              return of(null);
            })
          );
        })
      )
    ),

    loadResourcesByProject: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((projectId) => {
          return _http.get<{ data: IResource[] }>(`resources/project/${projectId}`).pipe(
            map(({ data }) => {
              patchState(store, { isLoading: false, resources: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, resources: [] });
              _toast.showError('Erreur lors du chargement des ressources');
              return of(null);
            })
          );
        })
      )
    )
  }))
);

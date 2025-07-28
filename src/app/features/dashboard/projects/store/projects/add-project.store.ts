import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IProject } from '../../../../../shared/models/entities.models';
import { ProjectDto } from '../../dto/project.dto';
import { Router } from '@angular/router';
import { ToastrService } from '../../../../../core/services/toast/toastr.service';

interface IAddProjectStore {
  isLoading: boolean;
  projects: IProject | null;
}

export const AddProjectStore = signalStore(
  withState<IAddProjectStore>({ isLoading: false, projects: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _router: inject(Router),
    _toast: inject(ToastrService)
  })),
  withMethods(({ _http, _router, _toast, ...store }) => ({
    addProject: rxMethod<ProjectDto>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((project) => {
          return _http.post<{ data: IProject }>('projects', project).pipe(
            map(({ data }) => {
              _toast.showSuccess('Le projet a été ajouté avec succès');
              _router.navigate(['/dashboard/projects']);
              patchState(store, { isLoading: false, projects: data });
            }),
            catchError(() => {
              _toast.showError("Une erreur s'est produite lors de l'ajout du projet");
              patchState(store, { isLoading: false, projects: null });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

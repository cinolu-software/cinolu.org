import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { ToastrService } from '@core/services/toast/toastr.service';
import { IForm } from '@shared/models';

interface IPhaseFormsStore {
  isLoading: boolean;
  forms: Record<string, IForm[]>;
}

export const ProjectFormsStore = signalStore(
  withState<IPhaseFormsStore>({
    isLoading: false,
    forms: {}
  }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService)
  })),
  withMethods(({ _http, _toast, ...store }) => ({
    loadFormsByPhase: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((phaseId) =>
          _http.get<{ data: IForm[] }>(`forms/phase/${phaseId}`).pipe(
            map(({ data }) => {
              patchState(store, {
                isLoading: false,
                forms: { ...store.forms(), [phaseId]: data }
              });
            }),
            catchError(() => {
              patchState(store, { isLoading: false });
              _toast.showError('Erreur lors du chargement des formulaires');
              return of(null);
            })
          )
        )
      )
    )
  }))
);

import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '../../../../../../core/services/toast/toastr.service';
import { IIndicator } from '../../../../../../shared/models/entities.models';
import { ProgramsStore } from './programs.store';

interface IAddIndicatorStore {
  isLoading: boolean;
}

export const AddIndicatorStore = signalStore(
  withState<IAddIndicatorStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _programsStore: inject(ProgramsStore),
  })),
  withMethods(({ _http, _toast, _programsStore, ...store }) => ({
    addIndicator: rxMethod<{ id: string; indicators: string[] }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ id, indicators }) => {
          return _http.post<{ data: IIndicator[] }>(`programs/indicators/${id}`, indicators).pipe(
            map(({ data }) => {
              console.log(data);
              _toast.showSuccess('Les indicateurs ont été ajoutés');
              patchState(store, { isLoading: false });
              _programsStore.addIndicators(id, data);
            }),
            catchError(() => {
              _toast.showError("Une erreur s'est produite");
              patchState(store, { isLoading: false });
              return of(null);
            }),
          );
        }),
      ),
    ),
  })),
);

import {
  patchState,
  signalStore,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SubprogramsStore } from './subprograms.store';
import { SubprogramDto } from '../dto/subprograms.dto';
import { ToastrService } from '../../../../../core/services/toast/toastr.service';
import { IProgram } from '../../../../../shared/models/entities.models';

interface IUpdateSubprogramStore {
  isLoading: boolean;
}

interface IUpdateSubprogramParams {
  payload: SubprogramDto;
  onSuccess: () => void;
}

export const UpdateSubprogramsStore = signalStore(
  withState<IUpdateSubprogramStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _programsStore: inject(SubprogramsStore),
    _toast: inject(ToastrService),
  })),
  withMethods(({ _http, _programsStore, _toast, ...store }) => ({
    updateProgram: rxMethod<IUpdateSubprogramParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ payload, onSuccess }) => {
          return _http
            .patch<{ data: IProgram }>(`subprograms/${payload.id}`, payload)
            .pipe(
              map(({ data }) => {
                _programsStore.updateProgram(data);
                _toast.showSuccess('Sous programme mis à jour');
                patchState(store, { isLoading: false });
                onSuccess();
              }),
              catchError(() => {
                _toast.showError('Échec de la mise à jour');
                patchState(store, { isLoading: false });
                return of(null);
              }),
            );
        }),
      ),
    ),
  })),
);

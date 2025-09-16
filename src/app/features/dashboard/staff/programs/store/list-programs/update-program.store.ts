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
import { ProgramsStore } from './programs.store';
import { ProgramDto } from '../../dto/programs/program.dto';
import { ToastrService } from '../../../../../../core/services/toast/toastr.service';
import { IProgram } from '../../../../../../shared/models/entities.models';

interface IUpdateProgramStore {
  isLoading: boolean;
}

interface IUpdateProgramParams {
  payload: ProgramDto;
  onSuccess: () => void;
}

export const UpdateProgramStore = signalStore(
  withState<IUpdateProgramStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _programsStore: inject(ProgramsStore),
    _toast: inject(ToastrService),
  })),
  withMethods(({ _http, _programsStore, _toast, ...store }) => ({
    updateProgram: rxMethod<IUpdateProgramParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ payload, onSuccess }) => {
          return _http
            .patch<{ data: IProgram }>(`programs/${payload.id}`, payload)
            .pipe(
              map(({ data }) => {
                _programsStore.updateProgram(data);
                _toast.showSuccess('Programme mis à jour');
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

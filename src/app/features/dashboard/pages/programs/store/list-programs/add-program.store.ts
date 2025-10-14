import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProgramsStore } from './programs.store';
import { ProgramDto } from '../../dto/programs/program.dto';
import { ToastrService } from '../../../../../../core/services/toast/toastr.service';
import { IProgram } from '../../../../../../shared/models/entities.models';

interface IAddProgramStore {
  isLoading: boolean;
}

interface IAddProgramParams {
  payload: ProgramDto;
  onSuccess: () => void;
}

export const AddProgramStore = signalStore(
  withState<IAddProgramStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _programsStore: inject(ProgramsStore),
    _toast: inject(ToastrService),
  })),
  withMethods(({ _http, _programsStore, _toast, ...store }) => ({
    addProgram: rxMethod<IAddProgramParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ payload, onSuccess }) => {
          return _http.post<{ data: IProgram }>('programs', payload).pipe(
            map(({ data }) => {
              _programsStore.addProgram(data);
              _toast.showSuccess('Programme ajouté');
              patchState(store, { isLoading: false });
              onSuccess();
            }),
            catchError(() => {
              _toast.showError("Échec de l'ajout du rôle");
              patchState(store, { isLoading: false });
              return of(null);
            }),
          );
        }),
      ),
    ),
  })),
);

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
import { IProgram } from '../../../../../shared/models/entities.models';
import { SubprogramsStore } from './subprograms.store';

interface IPublishSubprogramStore {
  isLoading: boolean;
  program: IProgram | null;
}

export const PublishSubprogramsStore = signalStore(
  withState<IPublishSubprogramStore>({ isLoading: false, program: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _programsStore: inject(SubprogramsStore),
  })),
  withMethods(({ _http, _programsStore, ...store }) => ({
    publishProgram: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => {
          return _http
            .post<{ data: IProgram }>(`subprograms/publish/${id}`, {})
            .pipe(
              map(({ data }) => {
                _programsStore.updateProgram(data);
                patchState(store, { isLoading: false, program: data });
              }),
              catchError(() => {
                patchState(store, { isLoading: false, program: null });
                return of(null);
              }),
            );
        }),
      ),
    ),
  })),
);

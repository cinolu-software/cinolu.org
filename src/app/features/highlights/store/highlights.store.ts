import {
  signalStore,
  withState,
  withMethods,
  patchState,
  withProps,
  withHooks,
} from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IHighlight } from '../../../shared/models/entities.models';

interface IHighlightsStore {
  isLoading: boolean;
  highlights: IHighlight | null;
}

export const HighlightsStore = signalStore(
  withState<IHighlightsStore>({ isLoading: false, highlights: null }),
  withProps(() => ({
    _http: inject(HttpClient),
  })),
  withMethods(({ _http, ...store }) => ({
    loadHighlights: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        exhaustMap(() => {
          return _http.get<{ data: IHighlight }>('highlights').pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, highlights: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, highlights: null });
              return of(null);
            }),
          );
        }),
      ),
    ),
  })),
  withHooks({
    onInit({ loadHighlights }) {
      loadHighlights();
    },
  }),
);

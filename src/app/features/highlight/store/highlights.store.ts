import {
  signalStore,
  withState,
  withMethods,
  patchState,
  withProps,
} from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { FilterHighlightsDto } from '../dto/filter-highlights.dto';
import { IHighlight } from '../../../shared/models/entities.models';
interface IHighlightsStore {
  isLoading: boolean;
  highlight: IHighlight | null;
}

export const HighlightsStore = signalStore(
  withState<IHighlightsStore>({ isLoading: false, highlight: null }),
  withProps(() => ({
    _http: inject(HttpClient),
  })),
  withMethods(({ _http, ...store }) => ({
    loadHighlights: rxMethod<FilterHighlightsDto>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return _http.get<{ data: IHighlight }>('highlights').pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, highlight: data });
              console.log(data);
            }),
            catchError((e) => {
              console.log(e);
              patchState(store, { isLoading: false, highlight: null });
              return of(null);
            }),
          );
        }),
      ),
    ),
  })),
);

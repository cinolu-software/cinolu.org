import {
  patchState,
  signalStore,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IComment } from '../../../../../../shared/models/entities.models';

interface ICommentsStore {
  isLoading: boolean;
  comment: IComment | null;
}

export const CommentStore = signalStore(
  withState<ICommentsStore>({ isLoading: false, comment: null }),
  withProps(() => ({
    _http: inject(HttpClient),
  })),
  withMethods(({ _http, ...store }) => ({
    loadComment: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => {
          return _http.get<{ data: IComment }>(`comments/${id}`).pipe(
            tap(({ data }) =>
              patchState(store, { isLoading: false, comment: data }),
            ),
            catchError(() => {
              patchState(store, { isLoading: false });
              return of(null);
            }),
          );
        }),
      ),
    ),
  })),
);

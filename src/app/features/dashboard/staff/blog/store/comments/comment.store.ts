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

interface ICommentsStores {
  isLoading: boolean;
  comments: IComment[] | null;
}

export const CommentStore = signalStore(
  withState<ICommentsStores>({ isLoading: false, comments: [] }),
  withProps(() => ({
    _http: inject(HttpClient),
  })),
  withMethods(({ _http, ...store }) => ({
    loadComments: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((articleId) => {
          return _http
            .get<{ data: IComment[] }>(`comments/article/${articleId}`)
            .pipe(
              tap(({ data }) => {
                const comments = Array.isArray(data[0]) ? data[0] : data;
                patchState(store, { isLoading: false, comments });
              }),

              catchError(() => {
                patchState(store, { isLoading: false, comments: [] });
                return of([]);
              }),
            );
        }),
      ),
    ),
  })),
);

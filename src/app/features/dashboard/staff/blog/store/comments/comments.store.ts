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
import { FilterArticlesCommentsDto } from '../../dto/filter-tags.dto';
import { buildQueryParams } from '../../../../../../shared/helpers/build-query-params';
import { IComment } from '../../../../../../shared/models/entities.models';

interface ICommentsStore {
  isLoading: boolean;
  comments: [IComment[], number];
}

export const CommentsStore = signalStore(
  withState<ICommentsStore>({ isLoading: false, comments: [[], 0] }),
  withProps(() => ({
    _http: inject(HttpClient),
  })),
  withMethods(({ _http, ...store }) => ({
    loadComments: rxMethod<FilterArticlesCommentsDto>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          return _http
            .get<{ data: [IComment[], number] }>('comments', { params })
            .pipe(
              map(({ data }) => {
                patchState(store, { isLoading: false, comments: data });
              }),
              catchError(() => {
                patchState(store, { isLoading: false, comments: [[], 0] });
                return of(null);
              }),
            );
        }),
      ),
    ),

    updateComment: (comment: IComment): void => {
      const [comments, count] = store.comments();
      const updated = comments.map((c) => (c.id === comment.id ? comment : c));
      patchState(store, { comments: [updated, count] });
    },

    deleteComment: (id: string): void => {
      const [comments, count] = store.comments();
      const filtered = comments.filter((comment) => comment.id !== id);
      patchState(store, { comments: [filtered, count - 1] });
    },
  })),
);

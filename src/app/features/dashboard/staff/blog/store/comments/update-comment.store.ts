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
import { CommentDto } from '../../dto/comment.dto';
import { Router } from '@angular/router';
import { ToastrService } from '../../../../../../core/services/toast/toastr.service';
import { IComment } from '../../../../../../shared/models/entities.models';

interface IUpdateCommentStore {
  isLoading: boolean;
  comment: IComment | null;
}

export const UpdateArticleStore = signalStore(
  withState<IUpdateCommentStore>({ isLoading: false, comment: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _router: inject(Router),
    _toast: inject(ToastrService),
  })),
  withMethods(({ _http, _toast, ...store }) => ({
    updateArticle: rxMethod<CommentDto>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((comment) => {
          return _http
            .patch<{ data: IComment }>(`comments/${comment.articleId}`, comment)
            .pipe(
              map(({ data }) => {
                _toast.showSuccess(
                  'Le commentaire a été mis à jour avec succès',
                );
                patchState(store, { isLoading: false, comment: data });
              }),
              catchError(() => {
                _toast.showError(
                  "Une erreur s'est produite lors de la mise à jour",
                );
                patchState(store, { isLoading: false, comment: null });
                return of(null);
              }),
            );
        }),
      ),
    ),
  })),
);

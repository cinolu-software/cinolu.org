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
import { CommentsStore } from './comments.store';
import { ToastrService } from '../../../../../../core/services/toast/toastr.service';
import { IComment } from '../../../../../../shared/models/entities.models';

interface IDeleteCommentStore {
  isLoading: boolean;
}

export const DeleteCommentStore = signalStore(
  withState<IDeleteCommentStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _commentsStore: inject(CommentsStore),
  })),
  withMethods(({ _http, _commentsStore, _toast, ...store }) => ({
    deleteComment: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => {
          return _http.delete<{ data: IComment }>(`comments/${id}`).pipe(
            tap(() => {
              _commentsStore.deleteComment(id);
              _toast.showSuccess('Commentaire a été supprimé avec succès');
              patchState(store, { isLoading: false });
            }),
            catchError(() => {
              _toast.showError(
                "Une erreur s'est produite lors de la suppression",
              );
              patchState(store, { isLoading: false });
              return of(null);
            }),
          );
        }),
      ),
    ),
  })),
);

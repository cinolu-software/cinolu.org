import { signalStore, withState, withMethods, patchState, withProps } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

interface IVoteResponse {
  success: boolean;
  message?: string;
}

interface IVoteStore {
  isLoading: boolean;
  isUpvoted: boolean;
  error: string | null;
}

export const VoteStore = signalStore(
  withState<IVoteStore>({ isLoading: false, isUpvoted: false, error: null }),
  withProps(() => ({
    _http: inject(HttpClient)
  })),
  withMethods(({ _http, ...store }) => ({
    upvote: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((idProject) => {
          return _http.post<IVoteResponse>(`projets/participations/${idProject}/upvote`, {}).pipe(
            tap(() => {
              patchState(store, { isLoading: false, isUpvoted: true });
            }),
            catchError((error) => {
              patchState(store, { isLoading: false, error: error.message || 'Erreur lors du vote' });
              return of(null);
            })
          );
        })
      )
    ),
    removeVote: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((idProject) => {
          return _http.delete<IVoteResponse>(`projets/participations/${idProject}/upvote`).pipe(
            tap(() => {
              patchState(store, { isLoading: false, isUpvoted: false });
            }),
            catchError((error) => {
              patchState(store, { isLoading: false, error: error.message || 'Erreur lors de la suppression du vote' });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

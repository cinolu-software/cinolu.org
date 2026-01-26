import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, exhaustMap, of, pipe, tap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { IOpportunityTag } from '../../../shared/models/entities.models';

interface IOpportunityTagsStore {
  isLoading: boolean;
  tags: IOpportunityTag[];
}

export const OpportunityTagsStore = signalStore(
  withState<IOpportunityTagsStore>({ isLoading: false, tags: [] }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadTags: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        exhaustMap(() => {
          return http.get<{ data: IOpportunityTag[] }>('opportunity-tags').pipe(
            tap(({ data }) => patchState(store, { isLoading: false, tags: data })),
            catchError(() => {
              patchState(store, { isLoading: false, tags: [] });
              return of(null);
            })
          );
        })
      )
    )
  })),
  withHooks({
    onInit: ({ loadTags }) => {
      loadTags();
    }
  })
);

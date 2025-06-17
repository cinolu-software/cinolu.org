import { signalStore, withState, withMethods, patchState, withHooks } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, exhaustMap, map, of, pipe, tap } from 'rxjs';
import { IEvent } from '../../shared/utils/types/models.type';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

interface IRecentEventsStore {
  isLoading: boolean;
  error: string | null;
  events: IEvent[];
}

export const RecentEventsStore = signalStore(
  withState<IRecentEventsStore>({
    isLoading: false,
    error: null,
    events: []
  }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadEvents: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        exhaustMap(() => {
          return http.get<{ data: IEvent[] }>('events/find-recent').pipe(
            map(({ data }) => patchState(store, { isLoading: false, events: data, error: null })),
            catchError((error) => {
              patchState(store, { isLoading: false, error: error['message'], events: [] });
              return of([]);
            })
          );
        })
      )
    )
  })),
  withHooks({
    onInit: ({ loadEvents }) => {
      loadEvents();
    }
  })
);

import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { IEvent } from '../../shared/utils/types/models.type';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

interface IEventStore {
  isLoading: boolean;
  error: string | null;
  event: IEvent | null;
}

export const EventStore = signalStore(
  withState<IEventStore>({
    isLoading: false,
    error: null,
    event: null
  }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadEvent: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((slug) => {
          return http.get<{ data: IEvent }>(`events/slug/${slug}`).pipe(
            tap(({ data }) => patchState(store, { isLoading: false, event: data, error: null })),
            catchError((error) => {
              patchState(store, { isLoading: false, error: error['message'] });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

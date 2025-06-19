import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { IEvent } from '../../shared/utils/types/models.type';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { QueryParams } from '../utils/types/query-params.type';
import { buildQueryParams } from '../../shared/utils/helpers/build-query-params.fn';

interface IEventsStore {
  isLoading: boolean;
  error: string | null;
  events: [IEvent[], number];
}

export const EventsStore = signalStore(
  withState<IEventsStore>({
    isLoading: false,
    error: null,
    events: [[], 0]
  }),
  withMethods((store, http = inject(HttpClient)) => ({
    loadEvents: rxMethod<QueryParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((params) => {
          return http
            .get<{ data: [IEvent[], number] }>('events/find-published', {
              params: buildQueryParams(params)
            })
            .pipe(
              map(({ data }) => patchState(store, { isLoading: false, events: data, error: null })),
              catchError((error) => {
                patchState(store, { isLoading: false, error: error['message'], events: [[], 0] });
                return of(null);
              })
            );
        })
      )
    )
  }))
);

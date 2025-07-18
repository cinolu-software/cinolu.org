import { signalStore, withState, withMethods, patchState, withHooks, withProps } from '@ngrx/signals';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { IEvent } from '../../shared/utils/types/models.type';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

interface IEventStore {
  isLoading: boolean;
  event: IEvent | null;
}

export const EventStore = signalStore(
  withState<IEventStore>({ isLoading: false, event: null }),
  withProps(() => ({
    _route: inject(ActivatedRoute)
  })),
  withMethods((store, http = inject(HttpClient)) => ({
    loadEvent: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((slug) => {
          return http.get<{ data: IEvent }>(`events/slug/${slug}`).pipe(
            tap(({ data }) => patchState(store, { isLoading: false, event: data })),
            catchError(() => {
              patchState(store, { isLoading: false });
              return of(null);
            })
          );
        })
      )
    )
  })),
  withHooks({
    onInit: ({ _route, loadEvent }) => {
      const slug = _route.snapshot.params['slug'] || '';
      loadEvent(slug);
    }
  })
);

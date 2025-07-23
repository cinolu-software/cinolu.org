import { patchState, signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { IEnterprise } from '../../../../../shared/models/entities';

interface IEnterpriseStore {
  isLoading: boolean;
  enterprise: IEnterprise | null;
}

export const EnterpriseStore = signalStore(
  withState<IEnterpriseStore>({ isLoading: false, enterprise: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _route: inject(ActivatedRoute)
  })),
  withMethods(({ _http, ...store }) => ({
    loadEnterprise: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, enterprise: null })),
        switchMap((slug) => {
          return _http.get<{ data: IEnterprise }>(`enterprises/by-slug/${slug}`).pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, enterprise: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, enterprise: null });
              return of(null);
            })
          );
        })
      )
    )
  })),
  withHooks({
    onInit: ({ loadEnterprise, _route }) => {
      const slug = _route.snapshot.params['slug'];
      loadEnterprise(slug);
    }
  })
);

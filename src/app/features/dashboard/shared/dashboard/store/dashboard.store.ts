import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import {
  signalStore,
  withState,
  withMethods,
  patchState,
  withProps,
  withHooks,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, tap, catchError, of, exhaustMap } from 'rxjs';
import { AdminStatsDto } from '../dto/stats.dto';
import { AuthStore } from '../../../../../core/auth/auth.store';

interface IStatsStore {
  isLoading: boolean;
  stats: AdminStatsDto | null;
}

export const DashboardStore = signalStore(
  withState<IStatsStore>({ isLoading: false, stats: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _authStore: inject(AuthStore),
  })),
  withMethods(({ _http, ...store }) => ({
    getAdminStats: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        exhaustMap(() => {
          return _http.get<{ data: AdminStatsDto }>('stats/admin').pipe(
            tap(({ data }) => {
              patchState(store, { isLoading: false, stats: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, stats: null });
              return of([]);
            }),
          );
        }),
      ),
    ),
  })),
  withHooks({
    onInit({ getAdminStats, _authStore }) {
      const roles = _authStore.user()?.roles as unknown as string[];
      const isStaff = roles.includes('admin') || roles.includes('staff');
      if (isStaff) getAdminStats();
    },
  }),
);

import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { inject, computed } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '@core/services/toast/toastr.service';
import { IMentorActivity, MentorDashboardStats } from '@shared/models';

interface MentorDashboardState {
  stats: MentorDashboardStats | null;
  recentActivity: IMentorActivity[];
  isLoading: boolean;
  error: string | null;
}

export const MentorDashboardStore = signalStore(
  { providedIn: 'root' },
  withState<MentorDashboardState>({
    stats: null,
    recentActivity: [],
    isLoading: false,
    error: null
  }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService)
  })),
  withComputed((state) => ({
    hasStats: computed(() => !!state.stats()),
    hasPendingRequests: computed(() => (state.stats()?.pendingRequests || 0) > 0),
    hasActiveMentees: computed(() => (state.stats()?.activeMentees || 0) > 0),
    hasUpcomingSessions: computed(() => (state.stats()?.upcomingSessions || 0) > 0)
  })),

  withMethods(({ _http, ...store }) => ({
    loadStats: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() =>
          _http.get<{ data: MentorDashboardStats }>('mentor/stats').pipe(
            tap(({ data }) => {
              patchState(store, {
                stats: data,
                isLoading: false
              });
            }),
            catchError(() => {
              patchState(store, {
                stats: {
                  totalSessions: 0,
                  upcomingSessions: 0,
                  completedSessions: 0,
                  totalMentees: 0,
                  activeMentees: 0,
                  pendingRequests: 0,
                  averageRating: 0
                },
                isLoading: false
              });
              return of(null);
            })
          )
        )
      )
    ),

    loadRecentActivity: rxMethod<void>(
      pipe(
        switchMap(() =>
          _http.get<{ data: IMentorActivity[] }>('mentor/activity/recent').pipe(
            tap(({ data }) => {
              patchState(store, { recentActivity: data });
            }),
            catchError(() => {
              patchState(store, { recentActivity: [] });
              return of(null);
            })
          )
        )
      )
    ),

    reset: () => {
      patchState(store, {
        stats: null,
        recentActivity: [],
        isLoading: false,
        error: null
      });
    }
  }))
);

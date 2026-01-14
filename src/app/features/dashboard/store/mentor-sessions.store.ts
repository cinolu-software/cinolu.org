import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { inject, computed } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from '@core/services/toast/toastr.service';
import { IMentorSession } from '@shared/models';

interface MentorSessionsState {
  sessions: IMentorSession[];
  selectedSession: IMentorSession | null;
  isLoading: boolean;
  error: string | null;
}

interface CreateSessionDto {
  mentee_id: string;
  title: string;
  description: string;
  scheduled_at: Date | string;
  duration_minutes: number;
  meeting_link?: string;
}

interface UpdateSessionDto {
  title?: string;
  description?: string;
  scheduled_at?: Date | string;
  duration_minutes?: number;
  meeting_link?: string;
  notes?: string;
  status?: 'scheduled' | 'completed' | 'cancelled';
}

export const MentorSessionsStore = signalStore(
  { providedIn: 'root' },
  withState<MentorSessionsState>({
    sessions: [],
    selectedSession: null,
    isLoading: false,
    error: null
  }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _router: inject(Router)
  })),
  withComputed((state) => ({
    upcomingSessions: computed(() => {
      const now = new Date();
      return state
        .sessions()
        .filter((s) => s.status === 'scheduled' && new Date(s.scheduled_at) > now)
        .sort((a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime());
    }),
    pastSessions: computed(() => {
      const now = new Date();
      return state
        .sessions()
        .filter((s) => s.status === 'completed' || new Date(s.scheduled_at) < now)
        .sort((a, b) => new Date(b.scheduled_at).getTime() - new Date(a.scheduled_at).getTime());
    }),
    cancelledSessions: computed(() => state.sessions().filter((s) => s.status === 'cancelled'))
  })),

  withMethods(({ _http, _toast, ...store }) => ({
    loadSessions: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() =>
          _http.get<{ data: IMentorSession[] }>('mentor/sessions').pipe(
            tap(({ data }) => {
              patchState(store, { sessions: data, isLoading: false });
            }),
            catchError((err) => {
              _toast.showError(err.error?.message || 'Erreur lors du chargement des sessions');
              patchState(store, { isLoading: false, error: err.error?.message || 'Erreur' });
              return of(null);
            })
          )
        )
      )
    ),

    loadSession: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((sessionId) =>
          _http.get<{ data: IMentorSession }>(`mentor/sessions/${sessionId}`).pipe(
            tap(({ data }) => {
              patchState(store, { selectedSession: data, isLoading: false });
            }),
            catchError((err) => {
              _toast.showError(err.error?.message || 'Erreur lors du chargement de la session');
              patchState(store, { isLoading: false, error: err.error?.message || 'Erreur' });
              return of(null);
            })
          )
        )
      )
    ),

    createSession: rxMethod<CreateSessionDto>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((dto) =>
          _http.post<{ data: IMentorSession }>('mentor/sessions', dto).pipe(
            tap(({ data }) => {
              const updated = [...store.sessions(), data];
              patchState(store, { sessions: updated, isLoading: false });
              _toast.showSuccess('Session créée avec succès');
            }),
            catchError((err) => {
              _toast.showError(err.error?.message || 'Erreur lors de la création de la session');
              patchState(store, { isLoading: false, error: err.error?.message || 'Erreur' });
              return of(null);
            })
          )
        )
      )
    ),

    updateSession: rxMethod<{ id: string; dto: UpdateSessionDto }>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(({ id, dto }) =>
          _http.patch<{ data: IMentorSession }>(`mentor/sessions/${id}`, dto).pipe(
            tap(({ data }) => {
              const updated = store.sessions().map((s) => (s.id === data.id ? data : s));
              patchState(store, { sessions: updated, isLoading: false });
              _toast.showSuccess('Session mise à jour');
            }),
            catchError((err) => {
              _toast.showError(err.error?.message || 'Erreur lors de la mise à jour de la session');
              patchState(store, { isLoading: false, error: err.error?.message || 'Erreur' });
              return of(null);
            })
          )
        )
      )
    ),

    cancelSession: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((sessionId) =>
          _http.delete<{ data: IMentorSession }>(`mentor/sessions/${sessionId}`).pipe(
            tap(({ data }) => {
              const updated = store.sessions().map((s) => (s.id === data.id ? data : s));
              patchState(store, { sessions: updated, isLoading: false });
              _toast.showSuccess('Session annulée');
            }),
            catchError((err) => {
              _toast.showError(err.error?.message || "Erreur lors de l'annulation de la session");
              patchState(store, { isLoading: false, error: err.error?.message || 'Erreur' });
              return of(null);
            })
          )
        )
      )
    ),

    reset: () => {
      patchState(store, {
        sessions: [],
        selectedSession: null,
        isLoading: false,
        error: null
      });
    }
  }))
);

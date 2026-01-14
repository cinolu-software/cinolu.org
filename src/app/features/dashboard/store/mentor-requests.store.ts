import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { inject, computed } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from '@core/services/toast/toastr.service';
import { IMentorRequest } from '@shared/models';

interface MentorRequestsState {
  requests: IMentorRequest[];
  selectedRequest: IMentorRequest | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Store pour gérer les demandes de mentorat
 * ⚠️ FUTUR - Endpoints API non encore implémentés
 */
export const MentorRequestsStore = signalStore(
  { providedIn: 'root' },
  withState<MentorRequestsState>({
    requests: [],
    selectedRequest: null,
    isLoading: false,
    error: null
  }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _router: inject(Router)
  })),
  withComputed((state) => ({
    pendingRequests: computed(() => state.requests().filter((r) => r.status === 'pending')),
    acceptedRequests: computed(() => state.requests().filter((r) => r.status === 'accepted')),
    rejectedRequests: computed(() => state.requests().filter((r) => r.status === 'rejected')),
    pendingCount: computed(() => state.requests().filter((r) => r.status === 'pending').length)
  })),

  withMethods(({ _http, _toast, ...store }) => ({
    loadRequests: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() =>
          _http.get<{ data: IMentorRequest[] }>('mentor/requests').pipe(
            tap(({ data }) => {
              patchState(store, { requests: data, isLoading: false });
            }),
            catchError((err) => {
              _toast.showError(err.error?.message || 'Erreur lors du chargement des demandes');
              patchState(store, { isLoading: false, error: err.error?.message || 'Erreur' });
              return of(null);
            })
          )
        )
      )
    ),

    loadRequest: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((requestId) =>
          _http.get<{ data: IMentorRequest }>(`mentor/requests/${requestId}`).pipe(
            tap(({ data }) => {
              patchState(store, { selectedRequest: data, isLoading: false });
            }),
            catchError((err) => {
              _toast.showError(err.error?.message || 'Erreur lors du chargement de la demande');
              patchState(store, { isLoading: false, error: err.error?.message || 'Erreur' });
              return of(null);
            })
          )
        )
      )
    ),

    acceptRequest: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((requestId) =>
          _http.patch<{ data: IMentorRequest }>(`mentor/requests/${requestId}/accept`, {}).pipe(
            tap(({ data }) => {
              const updated = store.requests().map((r) => (r.id === data.id ? data : r));
              patchState(store, { requests: updated, isLoading: false });
              _toast.showSuccess('Demande acceptée avec succès');
            }),
            catchError((err) => {
              _toast.showError(err.error?.message || "Erreur lors de l'acceptation de la demande");
              patchState(store, { isLoading: false, error: err.error?.message || 'Erreur' });
              return of(null);
            })
          )
        )
      )
    ),

    rejectRequest: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((requestId) =>
          _http.patch<{ data: IMentorRequest }>(`mentor/requests/${requestId}/reject`, {}).pipe(
            tap(({ data }) => {
              const updated = store.requests().map((r) => (r.id === data.id ? data : r));
              patchState(store, { requests: updated, isLoading: false });
              _toast.showSuccess('Demande rejetée');
            }),
            catchError((err) => {
              _toast.showError(err.error?.message || 'Erreur lors du rejet de la demande');
              patchState(store, { isLoading: false, error: err.error?.message || 'Erreur' });
              return of(null);
            })
          )
        )
      )
    ),

    reset: () => {
      patchState(store, {
        requests: [],
        selectedRequest: null,
        isLoading: false,
        error: null
      });
    }
  }))
);

import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { inject, computed } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from '@core/services/toast/toastr.service';
import { IMentee } from '@shared/models';

interface MentorMenteesState {
  mentees: IMentee[];
  selectedMentee: IMentee | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Store pour gérer les entrepreneurs suivis (mentees)
 * ⚠️ FUTUR - Endpoints API non encore implémentés
 */
export const MentorMenteesStore = signalStore(
  { providedIn: 'root' },
  withState<MentorMenteesState>({
    mentees: [],
    selectedMentee: null,
    isLoading: false,
    error: null
  }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _router: inject(Router)
  })),
  withComputed((state) => ({
    activeMentees: computed(() => state.mentees().filter((m) => m.status === 'active')),
    inactiveMentees: computed(() => state.mentees().filter((m) => m.status === 'inactive')),
    completedMentees: computed(() => state.mentees().filter((m) => m.status === 'completed')),
    totalMentees: computed(() => state.mentees().length),
    activeMenteesCount: computed(() => state.mentees().filter((m) => m.status === 'active').length)
  })),

  withMethods(({ _http, _toast, ...store }) => ({
    loadMentees: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(() =>
          _http.get<{ data: IMentee[] }>('mentor/mentees').pipe(
            tap(({ data }) => {
              patchState(store, { mentees: data, isLoading: false });
            }),
            catchError((err) => {
              _toast.showError(err.error?.message || 'Erreur lors du chargement des entrepreneurs');
              patchState(store, { isLoading: false, error: err.error?.message || 'Erreur' });
              return of(null);
            })
          )
        )
      )
    ),

    loadMentee: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((menteeId) =>
          _http.get<{ data: IMentee }>(`mentor/mentees/${menteeId}`).pipe(
            tap(({ data }) => {
              patchState(store, { selectedMentee: data, isLoading: false });
            }),
            catchError((err) => {
              _toast.showError(err.error?.message || "Erreur lors du chargement de l'entrepreneur");
              patchState(store, { isLoading: false, error: err.error?.message || 'Erreur' });
              return of(null);
            })
          )
        )
      )
    ),

    updateProgressNotes: rxMethod<{ id: string; notes: string }>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(({ id, notes }) =>
          _http
            .patch<{ data: IMentee }>(`mentor/mentees/${id}`, {
              progress_notes: notes
            })
            .pipe(
              tap(({ data }) => {
                const updated = store.mentees().map((m) => (m.id === data.id ? data : m));
                patchState(store, { mentees: updated, selectedMentee: data, isLoading: false });
                _toast.showSuccess('Notes de progression mises à jour');
              }),
              catchError((err) => {
                _toast.showError(err.error?.message || 'Erreur lors de la mise à jour des notes');
                patchState(store, { isLoading: false, error: err.error?.message || 'Erreur' });
                return of(null);
              })
            )
        )
      )
    ),

    completeMentorship: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((menteeId) =>
          _http.patch<{ data: IMentee }>(`mentor/mentees/${menteeId}/complete`, {}).pipe(
            tap(({ data }) => {
              const updated = store.mentees().map((m) => (m.id === data.id ? data : m));
              patchState(store, { mentees: updated, isLoading: false });
              _toast.showSuccess('Mentorat marqué comme terminé');
            }),
            catchError((err) => {
              _toast.showError(err.error?.message || 'Erreur lors de la finalisation du mentorat');
              patchState(store, { isLoading: false, error: err.error?.message || 'Erreur' });
              return of(null);
            })
          )
        )
      )
    ),

    reset: () => {
      patchState(store, {
        mentees: [],
        selectedMentee: null,
        isLoading: false,
        error: null
      });
    }
  }))
);

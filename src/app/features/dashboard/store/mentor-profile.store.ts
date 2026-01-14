import { patchState, signalStore, withComputed, withMethods, withProps, withState } from '@ngrx/signals';
import { inject, computed } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from '@core/services/toast/toastr.service';
import {
  IExpertise,
  UpdateMentorProfileDto,
  MentorStatus,
  CreateMentorProfileDto,
  IMentorProfile
} from '@shared/models';

interface MentorProfileState {
  profile: IMentorProfile | null;
  expertises: IExpertise[];
  isLoading: boolean;
  isUploadingCV: boolean;
  error: string | null;
}

export const MentorProfileStore = signalStore(
  { providedIn: 'root' },
  withState<MentorProfileState>({
    profile: null,
    expertises: [],
    isLoading: false,
    isUploadingCV: false,
    error: null
  }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _router: inject(Router)
  })),
  withComputed((state) => ({
    hasProfile: computed(() => !!state.profile()),
    isApproved: computed(() => state.profile()?.status === MentorStatus.APPROVED),
    isPending: computed(() => state.profile()?.status === MentorStatus.PENDING),
    isRejected: computed(() => state.profile()?.status === MentorStatus.REJECTED),
    cvUrl: computed(() => state.profile()?.cv || null),
    sortedExperiences: computed(() => {
      const experiences = state.profile()?.experiences || [];
      return [...experiences].sort((a, b) => {
        if (a.is_current) return -1;
        if (b.is_current) return 1;
        return new Date(b.start_date).getTime() - new Date(a.start_date).getTime();
      });
    })
  })),

  withMethods(({ _http, _toast, _router, ...store }) => ({
    loadProfile: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap((mentorProfileId) =>
          _http.get<{ data: IMentorProfile }>(`mentor-profiles/${mentorProfileId}`).pipe(
            tap(({ data }) => {
              patchState(store, {
                profile: data,
                isLoading: false
              });
            }),
            catchError((err) => {
              patchState(store, {
                isLoading: false,
                error: err.error?.message || 'Erreur lors du chargement'
              });
              _toast.showError(err.error?.message || 'Erreur lors du chargement du profil');
              return of(null);
            })
          )
        )
      )
    ),

    loadExpertises: rxMethod<void>(
      pipe(
        switchMap(() =>
          _http.get<{ data: IExpertise[] }>('expertises').pipe(
            tap(({ data }) => {
              patchState(store, { expertises: data });
            }),
            catchError((err) => {
              _toast.showError(err.error?.message || 'Erreur lors du chargement des expertises');
              return of(null);
            })
          )
        )
      )
    ),

    createProfile: rxMethod<{ data: CreateMentorProfileDto; onSuccess?: (profile: IMentorProfile) => void }>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(({ data, onSuccess }) =>
          _http.post<{ data: IMentorProfile }>('mentor-profiles', data).pipe(
            tap(({ data: profile }) => {
              patchState(store, {
                profile: profile,
                isLoading: false
              });
              _toast.showSuccess('Candidature soumise avec succès');
              if (onSuccess) {
                onSuccess(profile);
              }
            }),
            catchError((err) => {
              patchState(store, {
                isLoading: false,
                error: err.error?.message || 'Erreur'
              });
              _toast.showError(err.error?.message || 'Erreur lors de la soumission de la candidature');
              return of(null);
            })
          )
        )
      )
    ),

    updateProfile: rxMethod<{ id: string; dto: UpdateMentorProfileDto }>(
      pipe(
        tap(() => patchState(store, { isLoading: true, error: null })),
        switchMap(({ id, dto }) =>
          _http.patch<{ data: IMentorProfile }>(`mentor-profiles/${id}`, dto).pipe(
            tap(({ data }) => {
              patchState(store, {
                profile: data,
                isLoading: false
              });
              _toast.showSuccess('Profil mis à jour avec succès');
              _router.navigate(['/dashboard/mentor/profile']);
            }),
            catchError((err) => {
              patchState(store, {
                isLoading: false,
                error: err.error?.message || 'Erreur'
              });
              _toast.showError(err.error?.message || 'Erreur lors de la mise à jour du profil');
              return of(null);
            })
          )
        )
      )
    ),

    uploadCV: rxMethod<{ id: string; file: File }>(
      pipe(
        tap(() => patchState(store, { isUploadingCV: true, error: null })),
        switchMap(({ id, file }) => {
          const formData = new FormData();
          formData.append('cv', file);
          return _http.post<{ data: IMentorProfile }>(`mentor-profiles/add-cv/${id}`, formData).pipe(
            tap(({ data }) => {
              patchState(store, {
                profile: data,
                isUploadingCV: false
              });
              _toast.showSuccess('CV uploadé avec succès');
            }),
            catchError((err) => {
              patchState(store, {
                isUploadingCV: false,
                error: err.error?.message || 'Erreur'
              });
              _toast.showError(err.error?.message || "Erreur lors de l'upload du CV");
              return of(null);
            })
          );
        })
      )
    ),

    reset: () => {
      patchState(store, {
        profile: null,
        expertises: [],
        isLoading: false,
        isUploadingCV: false,
        error: null
      });
    }
  }))
);

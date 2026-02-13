import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '@core/services/toast/toastr.service';
import { IParticipation } from '@shared/models/entities.models';
import { Router } from '@angular/router';
import { ParticipateProjectDto } from '../dto/create-participation.dto';

interface IParticipationsStore {
  participations: IParticipation[];
  selectedParticipation: IParticipation | null;
  isLoading: boolean;
  totalCount: number;
}

export const ParticipationsStore = signalStore(
  { providedIn: 'root' },
  withState<IParticipationsStore>({
    participations: [],
    selectedParticipation: null,
    isLoading: false,
    totalCount: 0
  }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _router: inject(Router)
  })),

  withMethods(({ _http, _toast, _router, ...store }) => ({
    myParticipations: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(() => {
          return _http.get<{ data: IParticipation[] }>('projects/user/participations').pipe(
            tap(({ data }) => {
              patchState(store, {
                participations: data,
                totalCount: data.length,
                isLoading: false
              });
            }),
            catchError((err) => {
              patchState(store, { isLoading: false });
              _toast.showError(err.error?.message || 'Erreur lors du chargement des candidatures');
              return of(null);
            })
          );
        })
      )
    ),

    create: rxMethod<ParticipateProjectDto>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((data) =>
          _http
            .post<{ data: IParticipation }>(`projects/${data.projectId}/participate`, { ventureId: data.ventureId })
            .pipe(
              tap(() => {
                _toast.showSuccess('Candidature soumise avec succès');
                _router.navigate(['/dashboard/programs/my-applications']);
                patchState(store, { isLoading: false });
              }),
              catchError((err) => {
                _toast.showError(err.error?.message || "Une erreur s'est produite lors de la soumission");
                patchState(store, { isLoading: false });
                return of(null);
              })
            )
        )
      )
    ),

    checkExistingParticipation: (projectId: string, ventureId: string): boolean => {
      return store.participations().some((p) => p.project.id === projectId && p.venture.id === ventureId);
    },

    clearSelectedParticipation: () => {
      patchState(store, { selectedParticipation: null });
    }
  }))
);

import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { IEnterprise } from '../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '../../shared/services/toast/toastr.service';
import { IEnterprisePayload } from '../utils/types/add-enterprise.type';
import { Router } from '@angular/router';

interface IUpdateEnterprisetore {
  isLoading: boolean;
}

export const UpdateEnterprisetore = signalStore(
  withState<IUpdateEnterprisetore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _router: inject(Router)
  })),
  withMethods(({ _http, _toast, _router, ...store }) => ({
    updateEnterprise: rxMethod<{ slug: string; payload: IEnterprisePayload }>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((params) => {
          return _http.patch<{ data: IEnterprise }>(`enterprises/${params.slug}`, params.payload).pipe(
            tap(() => {
              patchState(store, { isLoading: false });
              _toast.showSuccess('Entreprise mise à jour avec succès');
              _router.navigate(['/profile/enterprises']);
            }),
            catchError(() => {
              patchState(store, { isLoading: false });
              _toast.showError("Erreur lors de la mise à jour de l'entreprise");
              return of(null);
            })
          );
        })
      )
    )
  }))
);

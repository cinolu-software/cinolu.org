import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IEnterprisePayload } from '../../utils/types/enterprises/add-enterprise.type';
import { Router } from '@angular/router';
import { ToastrService } from '../../../../core/services/toast/toastr.service';
import { IEnterprise } from '../../../../shared/models/entities';

interface IAddEnterpriseStore {
  isLoading: boolean;
}

export const AddEnterpriseStore = signalStore(
  withState<IAddEnterpriseStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _router: inject(Router)
  })),
  withMethods(({ _http, _toast, _router, ...store }) => ({
    addEnterprise: rxMethod<IEnterprisePayload>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((payload) => {
          return _http.post<{ data: IEnterprise }>('enterprises', payload).pipe(
            tap(() => {
              patchState(store, { isLoading: false });
              _toast.showSuccess('Entreprise ajoutée');
              _router.navigate(['/dashboard/enterprises']);
            }),
            catchError(() => {
              patchState(store, { isLoading: false });
              _toast.showError("Erreur lors de l'ajout");
              return of(null);
            })
          );
        })
      )
    )
  }))
);

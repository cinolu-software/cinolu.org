import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { IEnterprise } from '../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from '../../shared/services/toast/toastr.service';
import { IAddEnterprisePayload } from '../utils/types/add-enterprise.type';
import { Router } from '@angular/router';

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
    addEnterprise: rxMethod<IAddEnterprisePayload>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((payload) => {
          return _http.post<{ data: IEnterprise }>('enterprises', payload).pipe(
            tap(() => {
              patchState(store, { isLoading: false });
              _toast.showSuccess('Entreprise ajoutée avec succès');
              _router.navigate(['/profile/enterprises']);
            }),
            catchError(() => {
              patchState(store, { isLoading: false });
              _toast.showError("Erreur lors de l'ajout de l'entreprise");
              return of(null);
            })
          );
        })
      )
    )
  }))
);

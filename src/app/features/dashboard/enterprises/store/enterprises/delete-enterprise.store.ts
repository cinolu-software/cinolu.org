import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { EnterprisesStore } from './enterprises.store';
import { ToastrService } from '../../../../../core/services/toast/toastr.service';

interface IDeleteEnterpriseStore {
  isLoading: boolean;
}

export const DeleteEnterpriseStore = signalStore(
  withState<IDeleteEnterpriseStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _route: inject(ActivatedRoute),
    _enterprisesStore: inject(EnterprisesStore)
  })),
  withMethods(({ _http, _toast, _route, _enterprisesStore, ...store }) => ({
    deleteEnterprise: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((id) => {
          return _http.delete(`enterprises/${id}`).pipe(
            tap(() => {
              patchState(store, { isLoading: false });
              const page = _route.snapshot.queryParams['page'];
              _enterprisesStore.loadEnterprises({ page });
              _toast.showSuccess('Entreprise supprimée');
            }),
            catchError(() => {
              patchState(store, { isLoading: false });
              _toast.showError('Erreur lors de la suppression');
              return of(null);
            })
          );
        })
      )
    )
  }))
);

import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IRole } from '../../../shared/utils/types/models.type';
import { IRolePayload } from '../../utils/types/roles/role.type';
import { DashboardRolesStore } from './roles.store';

interface IDashboardUpdateRoleStore {
  isLoading: boolean;
}

interface IUpdateRoleParams {
  id: string;
  payload: IRolePayload;
  onSuccess: () => void;
}

export const DashboardUpdateRoleStore = signalStore(
  withState<IDashboardUpdateRoleStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _rolesStore: inject(DashboardRolesStore)
  })),
  withMethods(({ _http, _rolesStore, ...store }) => ({
    updateRole: rxMethod<IUpdateRoleParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ id, payload, onSuccess }) => {
          return _http.patch<{ data: IRole }>(`roles/${id}`, payload).pipe(
            map(({ data }) => {
              _rolesStore.updateRole(data);
              patchState(store, { isLoading: false });
              onSuccess();
            }),
            catchError(() => {
              patchState(store, { isLoading: false });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IRole } from '../../../shared/utils/types/models.type';
import { IRolePayload } from '../../utils/types/roles/role.type';
import { DashboardRolesStore } from './roles.store';
import { QueryParams } from '../../utils/types/query-params.type';

interface IDashboardUpdateRoleStore {
  isLoading: boolean;
  role: IRole | null;
}

interface IUpdateRoleParams {
  id: string;
  payload: IRolePayload;
  queryParams: QueryParams;
  onSuccess: () => void;
}

export const DashboardUpdateRoleStore = signalStore(
  withState<IDashboardUpdateRoleStore>({ isLoading: false, role: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _rolesStore: inject(DashboardRolesStore)
  })),
  withMethods(({ _http, _rolesStore, ...store }) => ({
    updateRole: rxMethod<IUpdateRoleParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ id, payload, queryParams, onSuccess }) => {
          return _http.patch<{ data: IRole }>(`roles/${id}`, payload).pipe(
            map(({ data }) => {
              _rolesStore.loadRoles(queryParams);
              patchState(store, { isLoading: false, role: data });
              onSuccess();
            }),
            catchError(() => {
              patchState(store, { isLoading: false, role: null });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IRole } from '../../../shared/utils/types/models.type';
import { IRolePayload } from '../../utils/types/roles/role.type';
import { DashboardRolesStore } from './roles.store';
import { QueryParams } from '../../utils/types/query-params.type';

interface IDashboardAddRoleStore {
  isLoading: boolean;
  role: IRole | null;
}

interface IAddRoleParams {
  payload: IRolePayload;
  queryParams: QueryParams;
  onSuccess: () => void;
}

export const DashboardAddRoleStore = signalStore(
  withState<IDashboardAddRoleStore>({ isLoading: false, role: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _rolesStore: inject(DashboardRolesStore)
  })),
  withMethods(({ _http, _rolesStore, ...store }) => ({
    addRole: rxMethod<IAddRoleParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ payload, queryParams, onSuccess }) => {
          return _http.post<{ data: IRole }>('roles', payload).pipe(
            map(({ data }) => {
              patchState(store, { isLoading: false, role: data });
              _rolesStore.loadRoles(queryParams);
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

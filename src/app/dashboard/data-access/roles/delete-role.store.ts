import { patchState, signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { QueryParams } from '../../utils/types/query-params.type';
import { DashboardRolesStore } from './roles.store';

interface IDashboardDeleteRoleStore {
  isLoading: boolean;
}

interface IDeleteRoleParams {
  id: string;
  queryParams: QueryParams;
}

export const DashboardDeleteRoleStore = signalStore(
  withState<IDashboardDeleteRoleStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _rolesStore: inject(DashboardRolesStore)
  })),
  withMethods(({ _http, _rolesStore, ...store }) => ({
    deleteRole: rxMethod<IDeleteRoleParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ id, queryParams }) => {
          return _http.delete<void>(`roles/${id}`).pipe(
            map(() => {
              patchState(store, { isLoading: false });
              _rolesStore.loadRoles(queryParams);
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

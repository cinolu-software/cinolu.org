import {
  patchState,
  signalStore,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RolesStore } from './roles.store';
import { RoleDto } from '../../dto/role.dto';
import { IRole } from '../../../../../../shared/models/entities.models';

interface IUpdateRoleStore {
  isLoading: boolean;
}

interface IUpdateRoleParams {
  payload: RoleDto;
  onSuccess: () => void;
}

export const UpdateRoleStore = signalStore(
  withState<IUpdateRoleStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _rolesStore: inject(RolesStore),
  })),
  withMethods(({ _http, _rolesStore, ...store }) => ({
    updateRole: rxMethod<IUpdateRoleParams>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(({ payload, onSuccess }) => {
          return _http
            .patch<{ data: IRole }>(`roles/${payload.id}`, payload)
            .pipe(
              map(({ data }) => {
                _rolesStore.updateRole(data);
                patchState(store, { isLoading: false });
                onSuccess();
              }),
              catchError(() => {
                patchState(store, { isLoading: false });
                return of(null);
              }),
            );
        }),
      ),
    ),
  })),
);

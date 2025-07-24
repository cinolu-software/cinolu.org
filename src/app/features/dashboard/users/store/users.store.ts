import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { FilterUsersDto } from '../dto/filter-user.dto';
import { buildQueryParams } from '../../../../shared/helpers/build-query-params';
import { IUser } from '../../../../shared/models/entities';

interface IUsersStore {
  isLoading: boolean;
  isFiltering: boolean;
  users: [IUser[], number];
}

export const UsersStore = signalStore(
  withState<IUsersStore>({ isLoading: false, isFiltering: false, users: [[], 0] }),
  withProps(() => ({
    _http: inject(HttpClient),
    _route: inject(ActivatedRoute)
  })),
  withMethods(({ _http, ...store }) => ({
    loadUsers: rxMethod<FilterUsersDto>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((queryParams) => {
          const params = buildQueryParams(queryParams);
          if (queryParams.page || queryParams.q) patchState(store, { isFiltering: true });
          return _http.get<{ data: [IUser[], number] }>('users', { params }).pipe(
            map(({ data }) => {
              patchState(store, { isLoading: false, isFiltering: false, users: data });
            }),
            catchError(() => {
              patchState(store, { isLoading: false, isFiltering: false, users: [[], 0] });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

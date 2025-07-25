import { patchState, signalStore, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IUser } from '../../../../shared/models/entities';
import { Router } from '@angular/router';
import { ToastrService } from '../../../../core/services/toast/toastr.service';
import { UserDto } from '../dto/user.dto';

interface IAddUserStore {
  isLoading: boolean;
  user: IUser | null;
}

export const AddUserStore = signalStore(
  withState<IAddUserStore>({ isLoading: false, user: null }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _router: inject(Router)
  })),
  withMethods(({ _http, _toast, _router, ...store }) => ({
    addUser: rxMethod<UserDto>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((userData) => {
          return _http.post<{ data: IUser }>(`users`, userData).pipe(
            map(({ data }) => {
              _router.navigate(['/dashboard/users']);
              _toast.showSuccess('Utilisateur ajouté avec succès');
              patchState(store, { isLoading: false, user: data });
            }),
            catchError(() => {
              _toast.showError("Erreur lors de l'ajout de l'utilisateur");
              patchState(store, { isLoading: false, user: null });
              return of(null);
            })
          );
        })
      )
    )
  }))
);

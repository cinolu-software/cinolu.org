import { patchState, signalStore, withMethods, withProps, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, finalize, of, pipe, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthStore } from '@core/auth/auth.store';
import { ToastrService } from '@core/services/toast/toastr.service';
import { IUser } from '@shared/models/entities.models';
import { UpdateInfoDto } from '../dto/update-info.dto';

interface IUpdateInfoStore {
  isLoading: boolean;
}

export const UpdateInfoStore = signalStore(
  withState<IUpdateInfoStore>({ isLoading: false }),
  withProps(() => ({
    _http: inject(HttpClient),
    _toast: inject(ToastrService),
    _authStore: inject(AuthStore)
  })),
  withMethods(({ _http, _toast, _authStore, ...store }) => {
    const makeRequest = <T>(url: string, payload: T, successMessage: string, errorMessage: string) =>
      rxMethod<T>(
        pipe(
          tap(() => patchState(store, { isLoading: true })),
          switchMap((data) =>
            _http.patch<{ data: IUser }>(url, data).pipe(
              tap(({ data: user }) => {
                _toast.showSuccess(successMessage);
                _authStore.setUser(user);
              }),
              catchError(() => {
                _toast.showError(errorMessage);
                return of(null);
              }),
              finalize(() => patchState(store, { isLoading: false }))
            )
          )
        )
      );

    return {
      updateInfo: makeRequest<UpdateInfoDto>(
        'auth/profile',
        {} as UpdateInfoDto,
        'Profil mis à jour',
        'Erreur lors de la mise à jour'
      ),
      updateInterests: makeRequest<{ interests: string[] }>(
        'users/my-interests',
        { interests: [] },
        "Centres d'intérêt mis à jour",
        "Erreur lors de la mise à jour des centres d'intérêt"
      )
    };
  })
);

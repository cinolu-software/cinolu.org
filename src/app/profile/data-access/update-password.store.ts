import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { IUser } from '../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { ProfileService } from './profile.service';
import { IUpdatePasswordPayload } from '../utils/types/update-password.type';

interface IUpdatePasswordStore {
  isLoading: boolean;
  user: IUser | null;
}

export const UpdatePasswordStore = signalStore(
  withState<IUpdatePasswordStore>({
    isLoading: false,
    user: null
  }),
  withMethods((store, profileService = inject(ProfileService)) => ({
    updatePassword: rxMethod<IUpdatePasswordPayload>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((payload) => {
          return profileService.updatePassword(payload).pipe(
            map((user) => patchState(store, { isLoading: false, user })),
            catchError(() => {
              patchState(store, { isLoading: false, user: null });
              return of();
            })
          );
        })
      )
    )
  }))
);

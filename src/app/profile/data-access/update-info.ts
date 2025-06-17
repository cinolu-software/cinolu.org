import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { IUser } from '../../shared/utils/types/models.type';
import { inject } from '@angular/core';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { catchError, map, of, pipe, switchMap, tap } from 'rxjs';
import { ProfileService } from './profile.service';
import { IUpdateInfoPayload } from '../utils/types/update-info.type';

interface IUpdateInfoStore {
  isLoading: boolean;
  user: IUser | null;
}

export const UpdateInfoStore = signalStore(
  withState<IUpdateInfoStore>({
    isLoading: false,
    user: null
  }),
  withMethods((store, profileService = inject(ProfileService)) => ({
    updateInfo: rxMethod<IUpdateInfoPayload>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap((payload) => {
          return profileService.updateProfile(payload).pipe(
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

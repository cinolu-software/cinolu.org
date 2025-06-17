import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { IUser } from '../../shared/utils/types/models.type';

interface IAuthStore {
  user: IUser | null;
}

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState<IAuthStore>({
    user: null
  }),
  withMethods((store) => ({
    setUser: (user: IUser | null) => patchState(store, { user })
  }))
);

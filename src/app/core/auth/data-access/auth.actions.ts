import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from 'app/core/types/models.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    authenticate: emptyProps(),
    authenticateUser: props<{ user: IUser | null }>(),
    signOut: emptyProps(),
    signoutSuccess: emptyProps()
  }
});

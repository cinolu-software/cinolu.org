import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { IUser } from '../../types/models.type';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    authentication: emptyProps(),
    authenticateUser: props<{ user: IUser | null }>()
  }
});

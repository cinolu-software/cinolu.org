import { createActionGroup, props } from '@ngrx/store';
import { IUser } from '../../app/common/types/models.type';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    signIn: props<{ user: IUser | null }>()
  }
});

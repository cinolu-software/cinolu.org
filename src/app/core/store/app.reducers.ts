import { createFeature, createReducer, on } from '@ngrx/store';
import { authActions } from './app.actions';

const initialState = {
  user: null,
  token: null
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.authentication, (state) => ({ ...state })),
    on(authActions.authenticateUser, (state, actions) => ({ ...state, user: actions.user }))
  )
});

export const { reducer: authReducers, selectUser, selectToken } = authFeature;

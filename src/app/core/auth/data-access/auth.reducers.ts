import { createFeature, createReducer, on } from '@ngrx/store';
import { authActions } from './auth.actions';
import { AuthStoreInterface } from '../types/auth-store.interface';

const initialState: AuthStoreInterface = {
  user: null
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.authenticate, (state) => ({ ...state })),
    on(authActions.authenticateUser, (state, actions) => ({ ...state, user: actions.user })),
    on(authActions.signOut, (state) => ({ ...state, user: null })),
    on(authActions.signoutSuccess, (state) => ({ ...state, user: null }))
  )
});

export const { reducer: authReducers, selectUser, selectAuthState } = authFeature;

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { IUpdateInfo } from '../utils/types/update-info.type';
import { IUpdatePassword } from '../utils/types/update-password.type';
import { APIService } from '../../shared/services/api/api.service';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { ToastrService } from '../../shared/services/toast/toastr.service';
import { authActions } from '../../shared/store/auth/auth.actions';
import { IUser } from '../../shared/utils/types/models.type';

@Injectable()
export class ProfileService {
  #apiService = inject(APIService);
  #store = inject(Store);
  #toast = inject(ToastrService);

  getByOutreacher(outreacher: string | undefined): Observable<IAPIResponse<IUser[]>> {
    return this.#apiService.get(`users/count-by-outreacher/${outreacher}`);
  }

  generateOutreacherLink(): Observable<IAPIResponse<IUser>> {
    const onSuccess = (user: IUser | undefined): void => {
      if (!user) return;
      this.#toast.showSuccess('Lien généré');
      this.#store.dispatch(authActions.signIn({ user }));
    };
    const onError = (error: string) => {
      this.#toast.showError(error);
    };
    return this.#apiService.post('users/generate-outreach-link', {}, onSuccess, onError);
  }

  updateProfile(dto: IUpdateInfo): Observable<IAPIResponse<IUser>> {
    const onSuccess = (user: IUser | undefined): void => {
      if (!user) return;
      this.#toast.showSuccess('Profil mis à jour');
      this.#store.dispatch(authActions.signIn({ user }));
    };
    const onError = (error: string): void => {
      this.#toast.showError(error);
    };
    return this.#apiService.patch('auth/profile', dto, onSuccess, onError);
  }

  updatePassword(dto: IUpdatePassword): Observable<IAPIResponse<IUser>> {
    const onSuccess = (user: IUser | undefined): void => {
      if (!user) return;
      this.#toast.showSuccess('Mot de passe mis à jour');
      this.#store.dispatch(authActions.signIn({ user }));
    };
    const onError = (error: string) => {
      this.#toast.showError(error);
    };
    return this.#apiService.patch('auth/update-password', dto, onSuccess, onError);
  }
}

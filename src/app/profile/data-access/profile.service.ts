import { inject, Injectable } from '@angular/core';
import { APIService } from '../../shared/services/api/api.service';
import { IUpdateProfile } from '../utils/types/update-profile.type';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { IUser } from '../../shared/utils/types/models.type';
import { HotToastService } from '@ngneat/hot-toast';
import { IUpdatePassword } from '../utils/types/update-password.type';
import { IAddDetails } from '../utils/types/add-detail.type';
import { Store } from '@ngrx/store';
import { authActions } from '../../shared/store/auth/auth.actions';
import { Router } from '@angular/router';

@Injectable()
export class ProfileService {
  #apiService = inject(APIService);
  #toast = inject(HotToastService);
  #store = inject(Store);
  #router = inject(Router);

  updateProfile(payload: IUpdateProfile): Observable<IAPIResponse<IUser>> {
    const onSuccess = (user: IUser): void => {
      this.#toast.success('Profil mis à jour !');
      this.#store.dispatch(authActions.signIn({ user }));
    };
    return this.#apiService.patch('auth/profile', payload, onSuccess);
  }

  addDetails(payload: IAddDetails): Observable<IAPIResponse<IUser>> {
    const onSuccess = (user: IUser): void => {
      this.#store.dispatch(authActions.signIn({ user }));
      this.#router.navigate(['/me']);
    };
    return this.#apiService.post('users/add-details', payload, onSuccess);
  }

  updateImage(file: FormData): Observable<IAPIResponse<IUser>> {
    const onSuccess = (user: IUser): void => {
      this.#toast.success('Photo de profil mis à jour !');
      this.#store.dispatch(authActions.signIn({ user }));
      this.#router.navigate(['/me']);
    };
    return this.#apiService.post(`users/image-profile`, file, onSuccess);
  }

  updatePassword(payload: IUpdatePassword): Observable<IAPIResponse<IUser>> {
    const onSuccess = (user: IUser): void => {
      this.#store.dispatch(authActions.signIn({ user }));
      this.#toast.success('Mot de passe mis à jour !');
      this.#router.navigate(['/me']);
    };
    return this.#apiService.patch('auth/update-password', payload, onSuccess);
  }
}

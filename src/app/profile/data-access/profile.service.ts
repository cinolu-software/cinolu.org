import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { IUpdateInfoPayload } from '../utils/types/update-info.type';
import { IUpdatePasswordPayload } from '../utils/types/update-password.type';
import { ToastrService } from '../../shared/services/toast/toastr.service';
import { IUser } from '../../shared/utils/types/models.type';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  #http = inject(HttpClient);
  #toast = inject(ToastrService);

  updateProfile(dto: IUpdateInfoPayload): Observable<IUser | null> {
    return this.#http.patch<{ data: IUser }>('auth/profile', dto).pipe(
      map((res) => {
        this.#toast.showSuccess('Profil mis à jour');
        return res.data;
      }),
      catchError(() => {
        this.#toast.showError('Erreur lors de la mise à jour du profil');
        return of(null);
      })
    );
  }

  updatePassword(dto: IUpdatePasswordPayload): Observable<IUser | null> {
    return this.#http.patch<{ data: IUser }>('auth/update-password', dto).pipe(
      map((res) => {
        this.#toast.showSuccess('Mot de passe mis à jour');
        return res.data;
      }),
      catchError(() => {
        this.#toast.showError('Erreur lors de la mise à jour du mot de passe');
        return of();
      })
    );
  }
}

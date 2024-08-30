import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { IInfoPayload } from './types/info-payload.interface';
import { map, Observable } from 'rxjs';
import { IUser } from 'app/core/types/models.interface';
import { ISecurityPayload } from './types/securirty-payload.interface';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private _httpClient: HttpClient = inject(HttpClient);
  private _apiURL = environment.apiUrl;

  updateInfo(payload: IInfoPayload): Observable<IUser> {
    return this._httpClient.patch<{ data: IUser }>(this._apiURL + 'auth/profile', payload).pipe(map((res) => res.data));
  }

  updatePassword(payload: ISecurityPayload): Observable<IUser> {
    return this._httpClient
      .patch<{ data: IUser }>(this._apiURL + 'auth/update-password', payload)
      .pipe(map((res) => res.data));
  }
}

import { inject, Injectable } from '@angular/core';
import { IUser } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { APIService } from 'app/shared/services/api/api.service';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';

@Injectable()
export class TeamService {
  #apiService = inject(APIService);

  getCoachs(): Observable<IAPIResponse<IUser[]>> {
    return this.#apiService.get<IUser[]>('users/roles/coachs');
  }

  getStaffMembers(): Observable<IAPIResponse<IUser[]>> {
    return this.#apiService.get<IUser[]>('users/roles/staff');
  }
}

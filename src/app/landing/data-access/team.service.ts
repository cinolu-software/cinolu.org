import { inject, Injectable } from '@angular/core';
import { IUser } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { APIService } from 'app/shared/services/api/api.service';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';

@Injectable()
export class TeamService {
  #apiService = inject(APIService);

  getCoachs(): Observable<IAPIResponse<IUser[]>> {
    return this.#apiService.fetchData<IUser[]>('users/coachs');
  }

  getStaffMembers(): Observable<IAPIResponse<IUser[]>> {
    return this.#apiService.fetchData<IUser[]>('users/staff');
  }
}

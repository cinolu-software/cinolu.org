import { inject, Injectable } from '@angular/core';
import { IPartner } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { APIService } from 'app/shared/services/api/api.service';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';

@Injectable()
export class PartnersService {
  #apiService = inject(APIService);

  getPartners(): Observable<IAPIResponse<IPartner[]>> {
    return this.#apiService.get<IPartner[]>('partners');
  }
}

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../../shared/services/api/api.service';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { IOrganization } from '../../shared/utils/types/models.type';

@Injectable()
export class EcosystemService {
  #apiService = inject(APIService);

  getCategoryCount(): Observable<IAPIResponse<{ category: string; count: number }[]>> {
    return this.#apiService.get('organizations/category-counts');
  }

  getOrganizations(): Observable<IAPIResponse<IOrganization[]>> {
    return this.#apiService.get('organizations');
  }
}

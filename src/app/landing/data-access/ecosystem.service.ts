import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from 'app/shared/services/api/api.service';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { ICategory, IMember } from 'app/shared/utils/types/models.type';

@Injectable()
export class EcosystemService {
  #apiService = inject(APIService);

  getCategories(): Observable<IAPIResponse<ICategory[]>> {
    return this.#apiService.get('ecosystem-categories');
  }

  getMembers(): Observable<IAPIResponse<IMember[]>> {
    return this.#apiService.get('members');
  }

  getMembersByCategory(category: string): Observable<IAPIResponse<IMember[]>> {
    return this.#apiService.get(`members/category/${category}`);
  }
}

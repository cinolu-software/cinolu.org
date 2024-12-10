import { inject, Injectable } from '@angular/core';
import { APIService } from '../../shared/services/api/api.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { IVenture } from '../../shared/utils/types/models.type';

@Injectable()
export class VenturesService {
  #apiService = inject(APIService);

  getVentures(): Observable<IAPIResponse<IVenture[]>> {
    return this.#apiService.get<IVenture[]>('ventures/find-published');
  }
}

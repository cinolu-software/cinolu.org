import { inject, Injectable } from '@angular/core';
import { APIService } from '../../shared/services/api/api.service';
import { ISector, IVenture } from '../../shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { IProjectPayload } from '../utils/types/project-payload.type';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';

@Injectable()
export class venturesService {
  #apiService = inject(APIService);
  #toast = inject(HotToastService);
  #router = inject(Router);

  getSectors(): Observable<IAPIResponse<ISector[]>> {
    return this.#apiService.get<ISector[]>('sectors');
  }

  createVenture(payload: IProjectPayload): Observable<IAPIResponse<IVenture>> {
    const onSuccess = (): void => {
      this.#toast.success('Projet soumis !');
      this.#router.navigate(['/me'], { queryParams: { tab: 'projects' } });
    };
    return this.#apiService.post<IProjectPayload, IVenture>('ventures', payload, onSuccess);
  }

  getVenture(id: string): Observable<IAPIResponse<IVenture>> {
    return this.#apiService.get<IVenture>('ventures/' + id);
  }
}

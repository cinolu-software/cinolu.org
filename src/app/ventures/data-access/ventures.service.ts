import { inject, Injectable } from '@angular/core';
import { APIService } from '../../shared/services/api/api.service';
import { ISector, IVenture } from '../../shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { IProjectPayload } from '../utils/types/project-payload.type';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class VenturesService {
  #apiService = inject(APIService);
  #toast = inject(ToastrService);
  #router = inject(Router);

  getSectors(): Observable<IAPIResponse<ISector[]>> {
    return this.#apiService.get<ISector[]>('sectors');
  }

  findByUser(): Observable<IAPIResponse<IVenture[]>> {
    return this.#apiService.get<IVenture[]>('ventures/find-by-user');
  }

  createVenture(payload: IProjectPayload): Observable<IAPIResponse<IVenture>> {
    const onSuccess = (): void => {
      this.#toast.success('Projet soumis !');
      this.#router.navigate(['/me'], { queryParams: { tab: 'projects' } });
    };
    return this.#apiService.post<IProjectPayload, IVenture>('ventures', payload, onSuccess);
  }

  updateVenture(id: string, payload: IProjectPayload): Observable<IAPIResponse<IVenture>> {
    const onSuccess = (venture: IVenture): void => {
      this.#toast.success('Projet mis à jour !');
      this.#router.navigate(['/ventures', venture.id]);
    };
    return this.#apiService.patch<IProjectPayload, IVenture>('ventures/' + id, payload, onSuccess);
  }

  addImage(id: string, file: FormData): Observable<IAPIResponse<IVenture>> {
    const onSuccess = (venture: IVenture): void => {
      this.#toast.success('Photo de couverture mis à jour !');
      this.#router.navigate(['/ventures', venture.id]);
    };
    return this.#apiService.post(`ventures/image/${id}`, file, onSuccess);
  }

  getVenture(id: string): Observable<IAPIResponse<IVenture>> {
    return this.#apiService.get<IVenture>('ventures/' + id);
  }
}

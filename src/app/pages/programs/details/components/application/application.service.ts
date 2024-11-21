import { inject, Injectable } from '@angular/core';
import { APIService } from '@core/services/api/api.service';
import { IApplicationPayload } from './types/application-payload.type';
import { Observable } from 'rxjs';
import { IAPIResponse } from '@core/services/api/types/api-response.type';
import { HotToastService } from '@ngneat/hot-toast';
import { IApplication } from 'app/common/types/models.type';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  #apiService = inject(APIService);
  #toast = inject(HotToastService);

  apply(payload: IApplicationPayload): Observable<IAPIResponse<IApplication>> {
    const onSuccess = (): void => {
      this.#toast.success('Candidature soumise !');
    };
    return this.#apiService.postData('program-applications', payload, onSuccess);
  }
}

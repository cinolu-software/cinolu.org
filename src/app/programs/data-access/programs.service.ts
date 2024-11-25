import { inject, Injectable } from '@angular/core';
import { IApplication, IProgram, IProgramCategory, IProgramType } from 'app/shared/types/models.type';
import { Observable } from 'rxjs';
import { APIService } from '@core/services/api/api.service';
import { IAPIResponse } from '@core/services/api/types/api-response.type';
import { QueryParams } from '../utils/types/query-params.type';
import { HttpParams } from '@angular/common/http';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from 'express';
import { IApplicationPayload } from '../utils/types/application-payload.type';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {
  #apiService = inject(APIService);
  #toast = inject(HotToastService);
  #router = inject(Router);

  getTypes(): Observable<IAPIResponse<IProgramType[]>> {
    return this.#apiService.fetchData('program-types');
  }

  getCategories(): Observable<IAPIResponse<IProgramCategory[]>> {
    return this.#apiService.fetchData('program-categories');
  }

  apply(payload: IApplicationPayload): Observable<IAPIResponse<IApplication>> {
    const onSuccess = (): void => {
      this.#toast.success('Candidature soumise !');
      this.#router.navigate(['/programs']);
    };
    return this.#apiService.postData('program-applications', payload, onSuccess);
  }

  getPrograms(queryParams: QueryParams): Observable<IAPIResponse<{ programs: IProgram[]; count: number }>> {
    const params = this.#buildQueryParams(queryParams);
    return this.#apiService.fetchData('programs', params);
  }

  getProgram(id: string): Observable<IAPIResponse<IProgram>> {
    return this.#apiService.fetchData(`programs/${id}`);
  }

  #buildQueryParams(queryParams: QueryParams): HttpParams {
    let params = new HttpParams();
    Object.keys(queryParams).forEach((key) => {
      const value = queryParams[key];
      if (!value) return;
      params = params.set(key, value);
    });
    return params;
  }
}

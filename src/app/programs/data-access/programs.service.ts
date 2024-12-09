import { inject, Injectable } from '@angular/core';
import { IApplication, IProgram, IProgramCategory, IProgramType } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { APIService } from 'app/shared/services/api/api.service';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { QueryParams } from '../utils/types/query-params.type';
import { HttpParams } from '@angular/common/http';
import { HotToastService } from '@ngneat/hot-toast';
import { IApplicationPayload } from '../utils/types/application-payload.type';
import { Router } from '@angular/router';

@Injectable()
export class ProgramsService {
  #apiService = inject(APIService);
  #toast = inject(HotToastService);
  #router = inject(Router);

  getTypes(): Observable<IAPIResponse<IProgramType[]>> {
    return this.#apiService.get('program-types');
  }

  getCategories(): Observable<IAPIResponse<IProgramCategory[]>> {
    return this.#apiService.get('program-categories');
  }

  apply(payload: IApplicationPayload): Observable<IAPIResponse<IApplication>> {
    const onSuccess = (): void => {
      this.#toast.success('Candidature soumise !');
      this.#router.navigate(['/programs']);
    };
    return this.#apiService.post('program-applications', payload, onSuccess);
  }

  getPrograms(queryParams: QueryParams): Observable<IAPIResponse<{ programs: IProgram[]; count: number }>> {
    const params = this.#buildQueryParams(queryParams);
    return this.#apiService.get('programs/find-published', params);
  }

  getProgram(id: string): Observable<IAPIResponse<IProgram>> {
    return this.#apiService.get(`programs/${id}`);
  }

  findRecent(): Observable<IAPIResponse<IProgram[]>> {
    return this.#apiService.get('programs/find-recent');
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

import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { IProgramCategory, IProgram, IProgramType } from 'app/common/types/models.type';
import { Observable } from 'rxjs';
import { QueryParams } from './types/query-params.type';
import { APIService } from '@core/services/api/api.service';
import { IAPIResponse } from '@core/services/api/types/api-response.type';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {
  #apiService = inject(APIService);

  getIds(): Observable<IAPIResponse<{ id: string }[]>> {
    return this.#apiService.fetchData('ids');
  }

  getTypes(): Observable<IAPIResponse<IProgramType[]>> {
    return this.#apiService.fetchData('program-types');
  }

  getCategories(): Observable<IAPIResponse<IProgramCategory[]>> {
    return this.#apiService.fetchData('program-categories');
  }

  getPrograms(queryParams: QueryParams): Observable<IAPIResponse<{ programs: IProgram[]; count: number }>> {
    const params = this.#buildQueryParams(queryParams);
    return this.#apiService.fetchData('programs', params);
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

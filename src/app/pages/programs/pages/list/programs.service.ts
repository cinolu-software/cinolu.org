import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectQuery, ObservableQueryResult } from '@ngneat/query';
import { IProgramCategory, IProgram, IProgramType } from 'app/common/types/models.type';
import { map } from 'rxjs';
import { QueryParams } from '../../types/query-params.type';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {
  #http = inject(HttpClient);
  #query = injectQuery();

  getTypes(): ObservableQueryResult<IProgramType[], Error> {
    return this.#query({
      queryKey: ['program-types'] as const,
      queryFn: () => this.#http.get<{ data: IProgramType[] }>('program-types').pipe(map((res) => res.data))
    }).result$;
  }

  getCategories(): ObservableQueryResult<IProgramCategory[], Error> {
    return this.#query({
      queryKey: ['program-categories'] as const,
      queryFn: () => this.#http.get<{ data: IProgramCategory[] }>('program-categories').pipe(map((res) => res.data))
    }).result$;
  }

  getPrograms(queryParams: QueryParams): ObservableQueryResult<{ programs: IProgram[]; count: number }, Error> {
    const params = this.#buildQueryParams(queryParams);
    return this.#query({
      queryKey: ['programs', queryParams] as const,
      queryFn: () =>
        this.#http
          .get<{ data: { programs: IProgram[]; count: number } }>('programs', { params })
          .pipe(map((res) => res.data))
    }).result$;
  }

  #buildQueryParams(queryParams: QueryParams): HttpParams {
    let params = new HttpParams();
    if (queryParams.page) params = params.set('page', queryParams.page.toString());
    if (queryParams.type) params = params.set('type', queryParams.type);
    if (queryParams.category) params = params.set('category', queryParams.category);
    if (queryParams.hideFinished) params = params.set('hideFinished', queryParams.hideFinished);
    return params;
  }
}

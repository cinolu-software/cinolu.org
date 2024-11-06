import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectQuery, ObservableQueryResult } from '@ngneat/query';
import { ICategory, IProgram, IType } from 'app/common/types/models.type';
import { map } from 'rxjs';
import { QueryParams } from '../../types/query-params.type';

@Injectable({
  providedIn: 'root'
})
export class ListProgramsService {
  #http = inject(HttpClient);
  #query = injectQuery();

  getTypes(): ObservableQueryResult<IType[], Error> {
    return this.#query({
      queryKey: ['types'] as const,
      queryFn: () => this.#http.get<{ data: IType[] }>('types').pipe(map((res) => res.data))
    }).result$;
  }

  getCategories(): ObservableQueryResult<ICategory[], Error> {
    return this.#query({
      queryKey: ['categories'] as const,
      queryFn: () => this.#http.get<{ data: ICategory[] }>('categories').pipe(map((res) => res.data))
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

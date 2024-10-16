import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectQuery, ObservableQueryResult } from '@ngneat/query';
import { IProgram, IType } from '../../common/types/models.type';
import { map } from 'rxjs';
import { QueryParams } from './types/query-params.type';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {
  #http = inject(HttpClient);
  #query = injectQuery();

  getTypes(): ObservableQueryResult<IType[], Error> {
    return this.#query({
      queryKey: ['types'] as const,
      queryFn: () => this.#http.get<{ data: IType[] }>('types').pipe(map((res) => res.data))
    }).result$;
  }

  getPrograms(queryParams: QueryParams): ObservableQueryResult<{ programs: IProgram[]; count: number }, Error> {
    const params = {};
    if (queryParams.page) params['page'] = queryParams.page;
    if (queryParams.type) params['type'] = queryParams.type;
    console.log(params);
    return this.#query({
      queryKey: ['programs'] as const,
      queryFn: () =>
        this.#http
          .get<{ data: { programs: IProgram[]; count: number } }>('programs', { params })
          .pipe(map((res) => res.data))
    }).result$;
  }
}

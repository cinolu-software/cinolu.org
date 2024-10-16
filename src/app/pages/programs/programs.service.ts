import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectQuery, ObservableQueryResult } from '@ngneat/query';
import { IProgram } from '../../common/types/models.type';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProgramsService {
  #http = inject(HttpClient);
  #query = injectQuery();

  getPrograms(page: number): ObservableQueryResult<{ programs: IProgram[]; count: number }, Error> {
    return this.#query({
      queryKey: ['programs'] as const,
      queryFn: () =>
        this.#http
          .get<{ data: { programs: IProgram[]; count: number } }>('programs', {
            params: { page }
          })
          .pipe(map((res) => res.data))
    }).result$;
  }
}

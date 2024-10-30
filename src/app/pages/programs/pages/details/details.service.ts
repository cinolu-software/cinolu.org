import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectQuery, ObservableQueryResult } from '@ngneat/query';
import { IProgram } from '@core/types/models.type';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsProgramsService {
  #http = inject(HttpClient);
  #query = injectQuery();

  getProgram(id: string): ObservableQueryResult<IProgram, Error> {
    return this.#query({
      queryKey: ['program', id] as const,
      queryFn: () => this.#http.get<{ data: IProgram }>(`programs/${id}`).pipe(map((res) => res.data))
    }).result$;
  }
}

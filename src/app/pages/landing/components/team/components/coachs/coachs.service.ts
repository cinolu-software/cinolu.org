import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectQuery, ObservableQueryResult } from '@ngneat/query';
import { IUser } from 'app/common/types/models.type';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoachService {
  #http = inject(HttpClient);
  #queryClient = injectQuery();

  getCoachs(): ObservableQueryResult<IUser[], Error> {
    return this.#queryClient({
      queryKey: ['coachs'] as const,
      queryFn: () => this.#http.get<{ data: IUser[] }>('users/coachs').pipe(map((res) => res.data))
    }).result$;
  }
}

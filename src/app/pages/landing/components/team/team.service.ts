import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectQuery, ObservableQueryResult } from '@ngneat/query';
import { IUser } from 'app/common/types/models.type';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  #http = inject(HttpClient);
  #queryClient = injectQuery();

  getTeamMember(role: string): ObservableQueryResult<IUser[], Error> {
    return this.#queryClient({
      queryKey: ['team', role] as const,
      queryFn: () => this.#http.get<{ data: IUser[] }>(`users/with-role/${role}`).pipe(map((res) => res.data))
    }).result$;
  }
}

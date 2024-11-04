import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectQuery, ObservableQueryResult } from '@ngneat/query';
import { IUser } from '@core/types/models.type';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  #http = inject(HttpClient);
  #queryClient = injectQuery();

  getStaffMembers(): ObservableQueryResult<IUser[], Error> {
    return this.#queryClient({
      queryKey: ['staff'] as const,
      queryFn: () => this.#http.get<{ data: IUser[] }>('users/staff').pipe(map((res) => res.data))
    }).result$;
  }
}

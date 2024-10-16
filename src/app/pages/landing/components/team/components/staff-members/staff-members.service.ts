import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectQuery, ObservableQueryResult } from '@ngneat/query';
import { IUser } from '../../../../../../common/types/models.type';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StaffMembersService {
  #http = inject(HttpClient);
  #queryClient = injectQuery();

  getStaffMembers(): ObservableQueryResult<IUser[], Error> {
    return this.#queryClient({
      queryKey: ['staff'] as const,
      queryFn: () => this.#http.get<{ data: IUser[] }>('users/staff-members').pipe(map((res) => res.data))
    }).result$;
  }
}

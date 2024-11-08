import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectQuery, ObservableQueryResult } from '@ngneat/query';
import { IEvent } from 'app/common/types/models.type';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  #http = inject(HttpClient);
  #query = injectQuery();

  getEvent(id: string): ObservableQueryResult<IEvent, Error> {
    return this.#query({
      queryKey: ['event', id] as const,
      queryFn: () => this.#http.get<{ data: IEvent }>(`events/${id}`).pipe(map((res) => res.data))
    }).result$;
  }
}

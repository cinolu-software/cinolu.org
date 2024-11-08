import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { injectQuery, ObservableQueryResult } from '@ngneat/query';
import { map } from 'rxjs';
import { QueryParams } from '../../types/query-params.type';
import { IEvent, IEventType } from 'app/common/types/models.type';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  #http = inject(HttpClient);
  #query = injectQuery();

  getTypes(): ObservableQueryResult<IEventType[], Error> {
    return this.#query({
      queryKey: ['event-types'] as const,
      queryFn: () => this.#http.get<{ data: IEventType[] }>('event-types').pipe(map((res) => res.data))
    }).result$;
  }

  getEvents(queryParams: QueryParams): ObservableQueryResult<{ events: IEvent[]; count: number }, Error> {
    const params = this.#buildQueryParams(queryParams);
    return this.#query({
      queryKey: ['events', queryParams] as const,
      queryFn: () =>
        this.#http.get<{ data: { events: IEvent[]; count: number } }>('events', { params }).pipe(map((res) => res.data))
    }).result$;
  }

  #buildQueryParams(queryParams: QueryParams): HttpParams {
    let params = new HttpParams();
    Object.keys(queryParams).forEach((key) => {
      const value = queryParams[key];
      if (!value) return;
      params = params.set(key, value);
    });
    return params;
  }
}

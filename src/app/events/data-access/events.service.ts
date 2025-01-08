import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEvent, IEventType } from 'app/shared/utils/types/models.type';
import { APIService } from 'app/shared/services/api/api.service';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { QueryParams } from '../utils/types/query-params.type';

@Injectable()
export class EventsService {
  #apiService = inject(APIService);

  getIds(): Observable<IAPIResponse<{ id: string }[]>> {
    return this.#apiService.get('ids');
  }

  getTypes(): Observable<IAPIResponse<IEventType[]>> {
    return this.#apiService.get('event-types');
  }

  getEvents(queryParams: QueryParams): Observable<IAPIResponse<{ events: IEvent[]; count: number }>> {
    const params = this.#buildQueryParams(queryParams);
    return this.#apiService.get('events/find-published', params);
  }

  getEvent(id: string): Observable<IAPIResponse<IEvent>> {
    return this.#apiService.get(`events/${id}`);
  }

  findRecent(): Observable<IAPIResponse<IEvent[]>> {
    return this.#apiService.get('events/find-recent');
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

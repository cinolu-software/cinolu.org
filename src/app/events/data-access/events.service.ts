import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEvent, IEventType } from 'app/shared/utils/types/models.type';
import { APIService } from 'app/shared/services/api/api.service';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { QueryParams } from '../utils/types/query-params.type';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  #apiService = inject(APIService);

  getIds(): Observable<IAPIResponse<{ id: string }[]>> {
    return this.#apiService.fetchData('ids');
  }

  getTypes(): Observable<IAPIResponse<IEventType[]>> {
    return this.#apiService.fetchData('event-types');
  }

  getEvents(queryParams: QueryParams): Observable<IAPIResponse<{ events: IEvent[]; count: number }>> {
    const params = this.#buildQueryParams(queryParams);
    return this.#apiService.fetchData('events', params);
  }

  getEvent(id: string): Observable<IAPIResponse<IEvent>> {
    return this.#apiService.fetchData(`events/${id}`);
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

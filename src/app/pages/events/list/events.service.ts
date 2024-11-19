import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QueryParams } from './types/query-params.type';
import { IEvent, IEventType } from 'app/common/types/models.type';
import { APIService } from '@core/services/api/api.service';
import { IAPIResponse } from '@core/services/api/types/api-response.type';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  #apiService = inject(APIService);

  getTypes(): Observable<IAPIResponse<IEventType[]>> {
    return this.#apiService.fetchData('event-types');
  }

  getEvents(queryParams: QueryParams): Observable<IAPIResponse<{ events: IEvent[]; count: number }>> {
    const params = this.#buildQueryParams(queryParams);
    return this.#apiService.fetchData('events', params);
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

import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../../shared/services/api/api.service';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { buildQueryParams } from '../../shared/utils/helpers/build-query-params.fn';
import { ICategory, IEvent } from '../../shared/utils/types/models.type';
import { QueryParams } from '../utils/types/query-params.type';

@Injectable()
export class EventsService {
  #apiService = inject(APIService);

  getIds(): Observable<IAPIResponse<{ id: string }[]>> {
    return this.#apiService.get('ids');
  }

  getCategories(): Observable<IAPIResponse<ICategory[]>> {
    return this.#apiService.get('event-categories');
  }

  getEvents(queryParams: QueryParams): Observable<IAPIResponse<[IEvent[], number]>> {
    const params = buildQueryParams(queryParams);
    return this.#apiService.get('events/find-published', params);
  }

  getEvent(slug: string): Observable<IAPIResponse<IEvent>> {
    return this.#apiService.get(`events/slug/${slug}`);
  }

  findRecent(): Observable<IAPIResponse<IEvent[]>> {
    return this.#apiService.get('events/find-recent');
  }
}

import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICategory, IEvent } from 'app/shared/utils/types/models.type';
import { APIService } from 'app/shared/services/api/api.service';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { QueryParams } from '../utils/types/query-params.type';
import { buildQueryParams } from 'app/shared/utils/helpers/build-query-params.fn';

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

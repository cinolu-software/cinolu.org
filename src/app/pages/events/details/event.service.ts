import { inject, Injectable } from '@angular/core';
import { IEvent } from 'app/common/types/models.type';
import { Observable } from 'rxjs';
import { APIService } from '@core/services/api/api.service';
import { IAPIResponse } from '@core/services/api/types/api-response.type';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  #apiService = inject(APIService);

  getEvent(id: string): Observable<IAPIResponse<IEvent>> {
    return this.#apiService.fetchData(`events/${id}`);
  }
}

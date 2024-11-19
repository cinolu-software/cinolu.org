import { inject, Injectable } from '@angular/core';
import { IProgram } from 'app/common/types/models.type';
import { Observable } from 'rxjs';
import { APIService } from '@core/services/api/api.service';
import { IAPIResponse } from '@core/services/api/types/api-response.type';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {
  #apiService = inject(APIService);

  getProgram(id: string): Observable<IAPIResponse<IProgram>> {
    return this.#apiService.fetchData(`programs/${id}`);
  }
}

import { inject, Injectable } from '@angular/core';
import { ICategory, IProject } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { APIService } from 'app/shared/services/api/api.service';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { QueryParams } from '../utils/types/query-params.type';
import { buildQueryParams } from 'app/shared/utils/helpers/build-query-params.fn';

@Injectable()
export class ProjectsService {
  #apiService = inject(APIService);

  getCategories(): Observable<IAPIResponse<ICategory[]>> {
    return this.#apiService.get('project-categories');
  }

  getProjects(queryParams: QueryParams): Observable<IAPIResponse<[IProject[], number]>> {
    const params = buildQueryParams(queryParams);
    return this.#apiService.get('projects/find-published', params);
  }

  getProject(slug: string): Observable<IAPIResponse<IProject>> {
    return this.#apiService.get(`projects/slug/${slug}`);
  }

  getRecent(): Observable<IAPIResponse<IProject[]>> {
    return this.#apiService.get('projects/find-recent');
  }
}

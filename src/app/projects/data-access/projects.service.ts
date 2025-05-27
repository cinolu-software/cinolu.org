import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { APIService } from '../../shared/services/api/api.service';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { buildQueryParams } from '../../shared/utils/helpers/build-query-params.fn';
import { ICategory, IProject } from '../../shared/utils/types/models.type';
import { QueryParams } from '../utils/types/query-params.type';

@Injectable()
export class ProjectsService {
  #apiService = inject(APIService);

  getCategories(): Observable<IAPIResponse<ICategory[]>> {
    return this.#apiService.get('project-categories');
  }

  getProjects(queryParams: QueryParams): Observable<IAPIResponse<[IProject[], number]>> {
    const params = buildQueryParams(queryParams as unknown as Record<string, string>);
    return this.#apiService.get('projects/find-published', params);
  }

  getProject(slug: string): Observable<IAPIResponse<IProject>> {
    return this.#apiService.get(`projects/slug/${slug}`);
  }

  getRecent(): Observable<IAPIResponse<IProject[]>> {
    return this.#apiService.get('projects/find-recent');
  }
}

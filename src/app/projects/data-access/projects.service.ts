import { inject, Injectable } from '@angular/core';
import { ICategory, IProject } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { APIService } from 'app/shared/services/api/api.service';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { QueryParams } from '../utils/types/query-params.type';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ProjectsService {
  #apiService = inject(APIService);

  getCategories(): Observable<IAPIResponse<ICategory[]>> {
    return this.#apiService.get('project-categories');
  }

  getProjects(queryParams: QueryParams): Observable<IAPIResponse<[IProject[], number]>> {
    const params = this.#buildQueryParams(queryParams);
    return this.#apiService.get('projects/find-published', params);
  }

  getProject(slug: string): Observable<IAPIResponse<IProject>> {
    return this.#apiService.get(`projects/slug/${slug}`);
  }

  findRecent(): Observable<IAPIResponse<IProject[]>> {
    return this.#apiService.get('projects/find-recent');
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

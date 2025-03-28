import { inject, Injectable } from '@angular/core';
import { IProject } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { APIService } from 'app/shared/services/api/api.service';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { QueryParams } from '../utils/types/query-params.type';
import { HttpParams } from '@angular/common/http';
// import { Router } from '@angular/router';

@Injectable()
export class ProjectsService {
  #apiService = inject(APIService);
  // #router = inject(Router);

  // getTypes(): Observable<IAPIResponse<IProjectType[]>> {
  //   return this.#apiService.get('project-types');
  // }

  // apply(payload: IApplicationPayload): Observable<IAPIResponse<IApplication>> {
  //   const onSuccess = (): void => {
  //     this.#toast.success('Candidature soumise !');
  //     this.#router.navigate(['/projects']);
  //   };
  //   return this.#apiService.post('project-applications', payload, onSuccess);
  // }

  getProjects(queryParams: QueryParams): Observable<IAPIResponse<[IProject[], number]>> {
    const params = this.#buildQueryParams(queryParams);
    return this.#apiService.get('projects/find-published', params);
  }

  getProject(id: string): Observable<IAPIResponse<IProject>> {
    return this.#apiService.get(`projects/${id}`);
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

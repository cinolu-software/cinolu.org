import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBlogCategory, IPost } from 'app/shared/utils/types/models.type';
import { APIService } from 'app/shared/services/api/api.service';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { QueryParams } from '../utils/types/query-params.type';

@Injectable()
export class BlogService {
  #apiService = inject(APIService);

  getCategories(): Observable<IAPIResponse<IBlogCategory[]>> {
    return this.#apiService.get('blog-categories');
  }

  getPosts(queryParams: QueryParams): Observable<IAPIResponse<[IPost[], number]>> {
    const params = this.#buildQueryParams(queryParams);
    return this.#apiService.get('blog-posts', params);
  }

  getPost(id: string): Observable<IAPIResponse<IPost>> {
    return this.#apiService.get(`blog-posts/${id}`);
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

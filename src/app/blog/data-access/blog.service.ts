import { inject, Injectable } from '@angular/core';
import { APIService } from '../../shared/services/api/api.service';
import { QueryParams } from '../utils/types/query-params.type';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { ICategory, IPost } from 'app/shared/utils/types/models.type';
import { buildQueryParams } from 'app/shared/utils/helpers/build-query-params.fn';

@Injectable()
export class BlogService {
  #apiService = inject(APIService);

  getCategories(): Observable<IAPIResponse<ICategory[]>> {
    return this.#apiService.get('blog-categories');
  }

  getRecentPosts(): Observable<IAPIResponse<IPost[]>> {
    return this.#apiService.get('blog-posts/recent');
  }

  getPost(slug: string): Observable<IAPIResponse<IPost>> {
    return this.#apiService.get(`blog-posts/slug/${slug}`);
  }

  getPosts(queryParams: QueryParams): Observable<IAPIResponse<[IPost[], number]>> {
    const params = buildQueryParams(queryParams);
    return this.#apiService.get('blog-posts', params);
  }
}

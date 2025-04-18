import { inject, Injectable } from '@angular/core';
import { APIService } from '../../shared/services/api/api.service';
import { QueryParams } from '../utils/types/query-params.type';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { ICategory, IComment, IPost } from 'app/shared/utils/types/models.type';
import { buildQueryParams } from 'app/shared/utils/helpers/build-query-params.fn';

@Injectable()
export class BlogService {
  #apiService = inject(APIService);

  viewPost(slug: string): Observable<IAPIResponse<IPost>> {
    return this.#apiService.post(`blog-posts/view/${slug}`, {});
  }

  likePost(slug: string): Observable<IAPIResponse<IPost>> {
    return this.#apiService.post(`blog-posts/like/${slug}`, {});
  }

  dislikePost(slug: string): Observable<IAPIResponse<IPost>> {
    return this.#apiService.post(`blog-posts/dislike/${slug}`, {});
  }

  getCategories(): Observable<IAPIResponse<ICategory[]>> {
    return this.#apiService.get('blog-categories');
  }

  getRecentPosts(): Observable<IAPIResponse<IPost[]>> {
    return this.#apiService.get('blog-posts/recent');
  }

  getComments(postId: string, loadMore: boolean): Observable<IAPIResponse<[IComment[], number]>> {
    const params = buildQueryParams({ loadMore });
    return this.#apiService.get(`post-comments/${postId}`, params);
  }

  getPost(slug: string): Observable<IAPIResponse<IPost>> {
    return this.#apiService.get(`blog-posts/slug/${slug}`);
  }

  getPosts(queryParams: QueryParams): Observable<IAPIResponse<[IPost[], number]>> {
    const params = buildQueryParams(queryParams);
    return this.#apiService.get('blog-posts', params);
  }
}

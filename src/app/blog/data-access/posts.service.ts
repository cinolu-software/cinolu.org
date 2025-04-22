import { inject, Injectable } from '@angular/core';
import { APIService } from '../../shared/services/api/api.service';
import { QueryParams } from '../utils/types/query-params.type';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { ICategory, IComment, IPost } from 'app/shared/utils/types/models.type';
import { buildQueryParams } from 'app/shared/utils/helpers/build-query-params.fn';
import { IAddComment } from '../utils/types/add-comment.type';
import { MessageService } from 'primeng/api';

@Injectable()
export class PostsService {
  #apiService = inject(APIService);
  #toast = inject(MessageService);

  viewPost(slug: string): Observable<IAPIResponse<IPost>> {
    return this.#apiService.post(`blog-posts/view/${slug}`, {});
  }

  getCategories(): Observable<IAPIResponse<ICategory[]>> {
    return this.#apiService.get('blog-categories');
  }

  getRecentPosts(): Observable<IAPIResponse<IPost[]>> {
    return this.#apiService.get('blog-posts/recent');
  }

  getComments(postId: string): Observable<IAPIResponse<IComment[]>> {
    return this.#apiService.get(`post-comments/${postId}`);
  }

  commentPost(addComment: IAddComment): Observable<IAPIResponse<IComment>> {
    const onSuccess = () => {
      this.#toast.add({
        severity: 'success',
        summary: 'Commentaire ajouté avec succès',
        life: 3000
      });
    };
    const onError = () => {
      this.#toast.add({
        severity: 'error',
        summary: 'Une erreur est survenue ',
        life: 3000
      });
    };
    return this.#apiService.post('post-comments', addComment, onSuccess, onError);
  }

  deleteComment(id: string): Observable<IAPIResponse<void>> {
    const onSuccess = () => {
      this.#toast.add({
        severity: 'success',
        summary: 'Commentaire supprimé avec succès',
        life: 3000
      });
    };
    const onError = () => {
      this.#toast.add({
        severity: 'error',
        summary: 'Une erreur est survenue ',
        life: 3000
      });
    };
    return this.#apiService.delete(`post-comments/${id}`, onSuccess, onError);
  }

  getPost(slug: string): Observable<IAPIResponse<IPost>> {
    return this.#apiService.get(`blog-posts/slug/${slug}`);
  }

  getPosts(queryParams: QueryParams): Observable<IAPIResponse<[IPost[], number]>> {
    const params = buildQueryParams(queryParams);
    return this.#apiService.get('blog-posts', params);
  }
}

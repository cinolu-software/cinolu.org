import { inject, Injectable } from '@angular/core';
import { APIService } from '../../shared/services/api/api.service';
import { QueryParams } from '../utils/types/query-params.type';
import { Observable } from 'rxjs';
import { IAddComment } from '../utils/types/add-comment.type';
import { IEditComment } from '../utils/types/edit-comment.type';
import { IAPIResponse } from '../../shared/services/api/types/api-response.type';
import { buildQueryParams } from '../../shared/utils/helpers/build-query-params.fn';
import { IPost, ICategory, IComment } from '../../shared/utils/types/models.type';
import { ToastrService } from '../../shared/services/toast/toastr.service';

@Injectable()
export class PostsService {
  #apiService = inject(APIService);
  #toast = inject(ToastrService);

  viewPost(slug: string): Observable<IAPIResponse<IPost>> {
    return this.#apiService.post(`blog-posts/view/${slug}`, {});
  }

  getCategories(): Observable<IAPIResponse<ICategory[]>> {
    return this.#apiService.get('blog-categories');
  }

  getRecentPosts(): Observable<IAPIResponse<IPost[]>> {
    return this.#apiService.get('blog-posts/recent');
  }

  getComments(slug: string, queryParams: QueryParams): Observable<IAPIResponse<[IComment[], number]>> {
    const params = buildQueryParams(queryParams);
    return this.#apiService.get(`post-comments/${slug}`, params);
  }

  commentPost(addComment: IAddComment): Observable<IAPIResponse<IComment>> {
    const onSuccess = () => {
      this.#toast.showSuccess('Commentaire ajouté avec succès');
    };
    const onError = () => {
      this.#toast.showError('Une erreur est survenue');
    };
    return this.#apiService.post('post-comments', addComment, onSuccess, onError);
  }

  deleteComment(id: string): Observable<IAPIResponse<void>> {
    const onSuccess = () => {
      this.#toast.showSuccess('Commentaire supprimé avec succès');
    };
    const onError = () => {
      this.#toast.showError('Une erreur est survenue');
    };
    return this.#apiService.delete(`post-comments/${id}`, onSuccess, onError);
  }

  updateComment(id: string, dto: IEditComment): Observable<IAPIResponse<IComment>> {
    const onSuccess = () => {
      this.#toast.showSuccess('Commentaire mis à jour avec succès');
    };
    const onError = () => {
      this.#toast.showError('Une erreur est survenue ');
    };
    return this.#apiService.patch(`post-comments/${id}`, dto, onSuccess, onError);
  }

  getPost(slug: string): Observable<IAPIResponse<IPost>> {
    return this.#apiService.get(`blog-posts/slug/${slug}`);
  }

  getPosts(queryParams: QueryParams): Observable<IAPIResponse<[IPost[], number]>> {
    const params = buildQueryParams(queryParams);
    return this.#apiService.get('blog-posts', params);
  }
}

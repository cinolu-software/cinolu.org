import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'app/blog/data-access/blog.service';
import { QueryParams } from 'app/blog/utils/types/query-params.type';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { ICategory, IPost } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  imports: [],
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {
  #blogService = inject(BlogService);
  posts$: Observable<IAPIResponse<IPost[]>>;
  recentPosts$: Observable<IAPIResponse<IPost[]>>;
  categories$: Observable<IAPIResponse<ICategory[]>>;
  #route = inject(ActivatedRoute);
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParams?.page) || null,
    categories: this.#route.snapshot.queryParams?.category || null,
    views: Number(this.#route.snapshot.queryParams?.views) || null,
    search: this.#route.snapshot.queryParams?.search || null
  });

  ngOnInit(): void {
    this.posts$ = this.#blogService.getPosts(this.queryParams());
    this.recentPosts$ = this.#blogService.getRecentPosts();
    this.categories$ = this.#blogService.getCategories();
  }
}

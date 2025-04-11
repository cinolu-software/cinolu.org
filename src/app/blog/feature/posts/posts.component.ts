import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'app/blog/data-access/blog.service';
import { QueryParams } from 'app/blog/utils/types/query-params.type';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { ICategory, IPost } from 'app/shared/utils/types/models.type';
import { NgxPaginationModule } from 'ngx-pagination';
import { MultiSelect, MultiSelectChangeEvent } from 'primeng/multiselect';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-posts',
  providers: [BlogService],
  imports: [CommonModule, MultiSelect, NgxPaginationModule],
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {
  #blogService = inject(BlogService);
  posts$: Observable<IAPIResponse<[IPost[], number]>>;
  recentPosts$: Observable<IAPIResponse<IPost[]>>;
  categories$: Observable<IAPIResponse<ICategory[]>>;
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParams?.page) || null,
    categories: this.#route.snapshot.queryParams?.category || null,
    views: Number(this.#route.snapshot.queryParams?.views) || null,
    search: this.#route.snapshot.queryParams?.search || null
  });

  ngOnInit(): void {
    this.recentPosts$ = this.#blogService.getRecentPosts();
    this.categories$ = this.#blogService.getCategories();
    this.loadPosts();
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage;
    this.updateRouteAndposts();
  }

  onClear(): void {
    this.queryParams().page = null;
    this.queryParams().categories = null;
    this.updateRouteAndposts();
  }

  onFilterChange(post: MultiSelectChangeEvent, filter: string): void {
    this.queryParams().page = null;
    this.queryParams()[filter] = post.value;
    this.updateRouteAndposts();
  }

  loadPosts(): void {
    this.posts$ = this.#blogService.getPosts(this.queryParams());
  }

  updateRoute(): void {
    const { page, categories } = this.queryParams();
    const queryParams = { page, categories };
    this.#router.navigate(['/posts'], { queryParams });
  }

  updateRouteAndposts(): void {
    this.updateRoute();
    this.loadPosts();
  }
}

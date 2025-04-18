import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'app/blog/data-access/blog.service';
import { carouselConfig } from 'app/blog/utils/config/carousel.config';
import { QueryParams } from 'app/blog/utils/types/query-params.type';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { ICategory, IPost } from 'app/shared/utils/types/models.type';
import { NgxPaginationModule } from 'ngx-pagination';
import { Carousel } from 'primeng/carousel';
import { Observable } from 'rxjs';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { PostCardComponent } from 'app/blog/ui/post-card/post-card.component';
import { PostCardSkeletonComponent } from '../../ui/post-card-skeleton/post-card-skeleton.component';

@Component({
  selector: 'app-posts',
  providers: [BlogService],
  imports: [
    CommonModule,
    NgxPaginationModule,
    NgOptimizedImage,
    Carousel,
    ApiImgPipe,
    PostCardComponent,
    PostCardSkeletonComponent
  ],
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {
  #blogService = inject(BlogService);
  posts$: Observable<IAPIResponse<[IPost[], number]>>;
  recentPosts$: Observable<IAPIResponse<IPost[]>>;
  categories$: Observable<IAPIResponse<ICategory[]>>;
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  carouselConfig = carouselConfig;
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParams?.page) || null,
    category: this.#route.snapshot.queryParams?.category || null,
    views: Number(this.#route.snapshot.queryParams?.views) || null,
    search: this.#route.snapshot.queryParams?.search || null
  });

  ngOnInit(): void {
    this.posts$ = this.#blogService.getPosts(this.queryParams());
    this.recentPosts$ = this.#blogService.getRecentPosts();
    this.categories$ = this.#blogService.getCategories();
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage;
    this.updateRouteAndposts();
  }

  onClear(): void {
    this.queryParams().page = null;
    this.queryParams().category = null;
    this.updateRouteAndposts();
  }

  onFilterChange(filter: string): void {
    this.queryParams().page = null;
    this.queryParams()['category'] = filter === 'Tous' ? null : filter;
    this.updateRouteAndposts();
  }

  loadPosts(): void {
    this.posts$ = this.#blogService.getPosts(this.queryParams());
  }

  updateRoute(): void {
    const { page, category } = this.queryParams();
    const queryParams = { page, category };
    this.#router.navigate(['/posts'], { queryParams });
  }

  updateRouteAndposts(): void {
    this.updateRoute();
    this.loadPosts();
  }
}

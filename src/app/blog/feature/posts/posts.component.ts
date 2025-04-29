import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'app/blog/data-access/posts.service';
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
  providers: [PostsService],
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
  #postsService = inject(PostsService);
  posts$: Observable<IAPIResponse<[IPost[], number]>>;
  recentPosts$: Observable<IAPIResponse<IPost[]>>;
  categories$: Observable<IAPIResponse<ICategory[]>>;
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  carouselConfig = carouselConfig;
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParams?.page) || null
  });

  ngOnInit(): void {
    this.posts$ = this.#postsService.getPosts(this.queryParams());
    this.recentPosts$ = this.#postsService.getRecentPosts();
    this.categories$ = this.#postsService.getCategories();
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage;
    this.updateRouteAndposts();
  }

  loadPosts(): void {
    this.posts$ = this.#postsService.getPosts(this.queryParams());
  }

  updateRoute(): void {
    const { page } = this.queryParams();
    const queryParams = { page };
    this.#router.navigate(['/posts'], { queryParams });
  }

  updateRouteAndposts(): void {
    this.updateRoute();
    this.loadPosts();
  }
}

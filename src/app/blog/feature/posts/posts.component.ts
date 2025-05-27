import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { Observable } from 'rxjs';
import { PostCardSkeletonComponent } from '../../ui/post-card-skeleton/post-card-skeleton.component';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IPost, ICategory } from '../../../shared/utils/types/models.type';
import { PostsService } from '../../data-access/posts.service';
import { PostCardComponent } from '../../ui/post-card/post-card.component';
import { carouselConfig } from '../../utils/config/carousel.config';
import { QueryParams } from '../../utils/types/query-params.type';
import { FooterComponent } from '../../../shared/layout/ui/footer/footer.component';

@Component({
  selector: 'app-posts',
  providers: [PostsService],
  imports: [CommonModule, NgxPaginationModule, PostCardComponent, PostCardSkeletonComponent, FooterComponent],
  templateUrl: './posts.component.html',
})
export class PostsComponent implements OnInit {
  #postsService = inject(PostsService);
  posts$: Observable<IAPIResponse<[IPost[], number]>> | undefined;
  categories$: Observable<IAPIResponse<ICategory[]>> | undefined;
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  carouselConfig = carouselConfig;
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParams['page']) || null,
  });

  ngOnInit(): void {
    this.posts$ = this.#postsService.getPosts(this.queryParams());
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

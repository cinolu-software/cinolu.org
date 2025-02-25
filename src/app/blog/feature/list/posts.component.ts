import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { IBlogCategory, IPost } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { FooterComponent } from '../../../shared/ui/footer/footer.component';
import { BlogService } from '../../data-access/blog.service';
import { QueryParams } from '../../utils/types/query-params.type';
import { PostCardComponent } from '../../ui/post-card/post-card.component';
import { PostComponent } from '../../ui/post-card-skeleton/post-card-skeleton.component';

@Component({
  selector: 'app-programs',
  providers: [BlogService],
  imports: [
    CommonModule,
    MatOptionModule,
    MatSlideToggleModule,
    NgxPaginationModule,
    MatChipsModule,
    FooterComponent,
    PostCardComponent,
    PostComponent
  ],
  templateUrl: './posts.component.html'
})
export class PostsComponent implements OnInit {
  skeletonArray = Array(6).fill(0);
  posts$: Observable<IAPIResponse<[IPost[], number]>>;
  categories$: Observable<IAPIResponse<IBlogCategory[]>>;
  #eventsService = inject(BlogService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  queryParams = signal<QueryParams>({
    page: +this.#route.snapshot.queryParams?.page || null,
    category: this.#route.snapshot.queryParams?.category || null
  });

  ngOnInit(): void {
    this.#loadPosts();
    this.categories$ = this.#eventsService.getCategories();
  }

  onFilterChange(event: MatChipListboxChange, filter: string): void {
    this.queryParams().page = null;
    this.queryParams()[filter] = event.value === 'all' ? null : event.value;
    this.#updateRouteAndEvents();
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage;
    this.#updateRouteAndEvents();
  }

  #loadPosts(): void {
    this.posts$ = this.#eventsService.getPosts(this.queryParams());
  }

  #updateRoute(): void {
    const { page, category } = this.queryParams();
    const queryParams = { page, category };
    this.#router.navigate(['/blog'], { queryParams });
  }

  #updateRouteAndEvents(): void {
    this.#updateRoute();
    this.#loadPosts();
  }
}

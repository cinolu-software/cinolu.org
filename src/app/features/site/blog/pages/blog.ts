import { Component, inject, OnInit, signal } from '@angular/core';
import { HeroBlog } from '../components/hero-blog/hero-blog';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticlesStore } from '../store/articles.store';
import { ArticleCard } from '../components/article-card/article-card';
import { FilterArticlesDto } from '../dto/filter-articles.dto';
import { NgxPaginationModule } from 'ngx-pagination';
import { ArticleCardSkeleton } from '../components/article-card-skeleton/article-card-skeleton';
import { TagsStore } from '../store/tags.store';
import { MultiSelectChangeEvent, MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-blog',
  providers: [ArticlesStore, TagsStore],
  imports: [
    HeroBlog,
    CommonModule,
    ArticleCard,
    NgxPaginationModule,
    ArticleCardSkeleton,
    MultiSelectModule,
  ],
  templateUrl: './blog.html',
})
export class Blog implements OnInit {
  store = inject(ArticlesStore);
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  tagsStore = inject(TagsStore);
  arrSkeleton = Array.from({ length: 12 }).fill(0);
  queryParams = signal<FilterArticlesDto>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    tags: this.#route.snapshot.queryParamMap.get('tags'),
  });

  ngOnInit(): void {
    this.store.loadArticles(this.queryParams());
  }

  async onFilterChange(
    event: MultiSelectChangeEvent,
    filter: 'page' | 'tags',
  ): Promise<void> {
    this.queryParams().page = null;
    this.queryParams()[filter] = event.value;
    await this.updateRouteAndArticles();
  }

  async onClear(): Promise<void> {
    this.queryParams().page = null;
    this.queryParams().tags = null;
    await this.updateRouteAndArticles();
  }

  async onPageChange(currentPage: number): Promise<void> {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    await this.updateRouteAndArticles();
  }

  async updateRoute(): Promise<void> {
    const { page, tags } = this.queryParams();
    const queryParams = { page, tags };
    await this.#router.navigate(['/blog-ressources'], { queryParams });
  }

  async updateRouteAndArticles(): Promise<void> {
    await this.updateRoute();
    this.store.loadArticles(this.queryParams());
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticlesStore } from '../../store/articles/articles.store';
import { ArticleCard } from '../../components/article-card/article-card';
import { FilterArticlesDto } from '../../dto/filter-articles.dto';
import { NgxPaginationModule } from 'ngx-pagination';
import { ArticleCardSkeleton } from '../../components/article-card-skeleton/article-card-skeleton';
import { TagsStore } from '../../store/articles/tags.store';
import { MultiSelectChangeEvent, MultiSelectModule } from 'primeng/multiselect';
import { HeroCard } from '../../../../layout/components/hero-card/hero-card';
import { Pen, LucideAngularModule } from 'lucide-angular';
import { AnalyticsService } from '@core/services/analytics/analytics.service';

@Component({
  selector: 'app-blog',
  providers: [ArticlesStore, TagsStore, LucideAngularModule],
  imports: [CommonModule, ArticleCard, NgxPaginationModule, ArticleCardSkeleton, MultiSelectModule, HeroCard],
  templateUrl: './list-articles.html'
})
export class ListArticles implements OnInit {
  store = inject(ArticlesStore);
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  tagsStore = inject(TagsStore);
  #analytics = inject(AnalyticsService);
  arrSkeleton = Array.from({ length: 12 }).fill(0);
  queryParams = signal<FilterArticlesDto>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    tags: this.#route.snapshot.queryParamMap.get('tags')
  });
  icons = { edit: Pen };

  ngOnInit(): void {
    this.store.loadArticles(this.queryParams());
  }

  async onFilterChange(event: MultiSelectChangeEvent, filter: 'page' | 'tags'): Promise<void> {
    this.queryParams().page = null;
    this.queryParams()[filter] = event.value;
    if (filter === 'tags') {
      const raw = (event.value || []) as unknown[];
      const tags = raw.map((t) => (typeof t === 'string' ? t : ((t as { name?: string }).name ?? String(t))));
      this.#analytics.trackBlogFilter(tags);
    }
    await this.updateRouteAndArticles();
  }

  async onClear(): Promise<void> {
    this.queryParams().page = null;
    this.queryParams().tags = null;
    await this.updateRouteAndArticles();
  }

  async onPageChange(currentPage: number): Promise<void> {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.#analytics.trackBlogPagination(currentPage);
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

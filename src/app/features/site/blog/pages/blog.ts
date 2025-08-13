import { Component, inject, OnInit, signal } from '@angular/core';
import { LucideAngularModule, UserPlus } from 'lucide-angular';
import { HeroBlog } from '../components/hero-blog/hero-blog';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ArticlesStore } from '../store/articles.store';
import { ArticleCard } from '../components/article-card/article-card';
import { FilterArticlesDto } from '../dto/filter-articles.dto';
import { NgxPaginationModule } from 'ngx-pagination';
import { MultiSelectChangeEvent } from 'primeng/multiselect';

@Component({
  selector: 'app-blog',
  providers: [ArticlesStore],
  imports: [
    LucideAngularModule,
    HeroBlog,
    RouterLink,
    CommonModule,
    ArticleCard,
    NgxPaginationModule,
  ],
  templateUrl: './blog.html',
})
export class Blog implements OnInit {
  store = inject(ArticlesStore);
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  icons = {
    userPlus: UserPlus,
  };
  queryParams = signal<FilterArticlesDto>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    tags: this.#route.snapshot.queryParamMap.get('tags'),
  });

  ngOnInit(): void {
    this.store.loadArticles(this.queryParams());
  }

  onFilterChange(event: MultiSelectChangeEvent, filter: 'page' | 'tags'): void {
    this.queryParams().page = null;
    this.queryParams()[filter] = event.value;
    this.updateRouteAndEvents();
  }

  onClear(): void {
    this.queryParams().page = null;
    this.queryParams().tags = null;
    this.updateRouteAndEvents();
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndEvents();
  }

  updateRoute(): void {
    const { page, tags } = this.queryParams();
    const queryParams = { page, tags };
    this.#router.navigate(['/events'], { queryParams });
  }

  updateRouteAndEvents(): void {
    this.updateRoute();
    this.store.loadArticles(this.queryParams());
  }
}

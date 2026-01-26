import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal, computed, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { OpportunityCard } from '../../components/opportunity-card/opportunity-card';
import { OpportunityCardSkeleton } from '../../components/opportunity-card-skeleton/opportunity-card-skeleton';
import { FilterOpportunitiesDto } from '../../dto/filter-opportunities.dto';
import { MultiSelectModule, MultiSelectChangeEvent } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { OpportunitiesStore } from '../../store/opportunities.store';
import { OpportunityTagsStore } from '../../store/opportunity-tags.store';
import { TranslateModule } from '@ngx-translate/core';
import { Search, LucideAngularModule } from 'lucide-angular';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-opportunities',
  providers: [OpportunitiesStore, OpportunityTagsStore],
  imports: [
    CommonModule,
    NgxPaginationModule,
    FormsModule,
    MultiSelectModule,
    OpportunityCard,
    OpportunityCardSkeleton,
    TranslateModule,
    LucideAngularModule,
    InputTextModule
  ],
  templateUrl: './list-opportunities.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListOpportunities implements OnInit {
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  skeletonArray = Array(6).fill(0);
  store = inject(OpportunitiesStore);
  tagsStore = inject(OpportunityTagsStore);
  queryParams = signal<FilterOpportunitiesDto>({
    page: this.#route.snapshot.queryParams?.['page'] || '1',
    q: this.#route.snapshot.queryParams?.['q'] || ''
  });

  // Tags sélectionnés pour le filtrage côté client
  selectedTags = signal<string[]>([]);

  icons = {
    search: Search
  };

  readonly itemsPerPage = 20; // Selon la documentation API

  // Computed pour les opportunités (depuis le store)
  opportunities = computed(() => {
    const [opps] = this.store.opportunities();
    return opps;
  });

  // Total count depuis le store
  totalCount = computed(() => {
    const [, count] = this.store.opportunities();
    return count;
  });

  // Filtrer les opportunités côté client par tags uniquement
  filteredOpportunities = computed(() => {
    const opportunities = this.opportunities();
    const tags = this.selectedTags();

    if (!tags || tags.length === 0) {
      return opportunities;
    }

    return opportunities.filter((opp) => opp.tags.some((tag) => tags.includes(tag.id)));
  });

  // Afficher pagination si plus de 20 items
  shouldShowPagination = computed(() => {
    return this.totalCount() > this.itemsPerPage;
  });

  ngOnInit(): void {
    this.store.loadOpportunities(this.queryParams());
    this.tagsStore.loadTags();
  }

  async onSearch(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    this.queryParams.update((params) => ({
      ...params,
      page: '1',
      q: input.value
    }));
    await this.updateRoute();
    this.store.loadOpportunities(this.queryParams());
  }

  async onTagsChange(event: MultiSelectChangeEvent): Promise<void> {
    // Filtrage côté client uniquement
    this.selectedTags.set(event.value || []);
  }

  async onClear(): Promise<void> {
    this.selectedTags.set([]);
  }

  async onPageChange(currentPage: number): Promise<void> {
    this.queryParams.update((params) => ({
      ...params,
      page: currentPage.toString()
    }));
    await this.updateRoute();
    this.store.loadOpportunities(this.queryParams());
  }

  async updateRoute(): Promise<void> {
    const { page, q } = this.queryParams();
    const queryParams = {
      page: page === '1' ? null : page,
      q: q || null
    };
    await this.#router.navigate(['/opportunities'], { queryParams });
  }
}

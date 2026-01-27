import { Component, OnInit, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserOpportunitiesStore } from '@features/opportunities/store/user-opportunities.store';
import { OpportunityCard } from '@features/opportunities/components/opportunity-card/opportunity-card';
import { LucideAngularModule, Sparkles, Loader2, Search } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-opportunities',
  providers: [UserOpportunitiesStore],
  imports: [CommonModule, OpportunityCard, LucideAngularModule, TranslateModule],
  templateUrl: './dashboard-opportunities.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardOpportunities implements OnInit {
  readonly store = inject(UserOpportunitiesStore);

  icons = {
    sparkles: Sparkles,
    loader: Loader2,
    search: Search
  };

  opportunities = computed(() => {
    const data = this.store.opportunities();
    return data ? data[0] : [];
  });

  totalCount = computed(() => {
    const data = this.store.opportunities();
    return data ? data[1] : 0;
  });

  ngOnInit(): void {
    this.store.loadOpportunitiesForUser();
  }
}

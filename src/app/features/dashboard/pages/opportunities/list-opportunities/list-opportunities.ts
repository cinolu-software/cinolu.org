import { Component, OnInit, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { UserOpportunitiesStore } from '@features/opportunities/store/user-opportunities.store';
import { DashboardOpportunityCard } from '@features/dashboard/components/dashboard-opportunity-card/dashboard-opportunity-card';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-list-opportunities',
  providers: [UserOpportunitiesStore],
  imports: [DashboardOpportunityCard, TranslateModule],
  templateUrl: './list-opportunities.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListOpportunities implements OnInit {
  readonly store = inject(UserOpportunitiesStore);

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

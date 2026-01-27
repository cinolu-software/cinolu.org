import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';
import {
  LucideAngularModule,
  CalendarCheck,
  CalendarX,
  Tag,
  AlertCircle,
  ExternalLink,
  ChevronLeft
} from 'lucide-angular';
import { OpportunityStore } from '@features/opportunities/store/opportunity.store';

@Component({
  selector: 'app-opportunity-detail',
  providers: [OpportunityStore],
  imports: [RouterModule, DatePipe, TitleCasePipe, LucideAngularModule],
  templateUrl: './opportunity-detail.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpportunityDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly store = inject(OpportunityStore);

  icons = {
    calendarCheck: CalendarCheck,
    calendarX: CalendarX,
    tag: Tag,
    alertCircle: AlertCircle,
    externalLink: ExternalLink,
    chevronLeft: ChevronLeft
  };

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.store.loadOpportunity(slug);
    }
  }
}

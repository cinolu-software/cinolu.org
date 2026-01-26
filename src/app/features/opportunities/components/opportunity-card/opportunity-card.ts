import { CommonModule } from '@angular/common';
import { Component, input, computed, ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, MoveRight, CalendarCheck, CalendarX, ExternalLink, Tag } from 'lucide-angular';
import { IOpportunity } from '../../../../shared/models/entities.models';
import { Button } from 'primeng/button';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-opportunity-card',
  imports: [LucideAngularModule, CommonModule, RouterLink, Button, TranslateModule],
  templateUrl: './opportunity-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpportunityCard {
  private readonly translateService = inject(TranslateService);

  opportunity = input.required<IOpportunity>();
  buttonTextKey = input<string>('opportunities.explore');
  icons = { MoveRight, CalendarCheck, CalendarX, ExternalLink, Tag };

  buttonLabelKey = computed(() => this.buttonTextKey());
  buttonLabel = computed(() => this.translateService.instant(this.buttonLabelKey()));

  isEndingSoon = computed(() => {
    const opportunity = this.opportunity();
    if (!opportunity?.ended_at) return false;

    const now = new Date();
    const end = new Date(opportunity.ended_at);
    const daysLeft = Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysLeft > 0 && daysLeft <= 7;
  });

  daysLeft = computed(() => {
    const opportunity = this.opportunity();
    if (!opportunity?.ended_at) return 0;

    const now = new Date();
    const end = new Date(opportunity.ended_at);
    return Math.ceil((end.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  });

  status = computed(() => {
    const opportunity = this.opportunity();
    if (!opportunity?.started_at || !opportunity?.ended_at) return 'unknown';

    const now = new Date();
    const start = new Date(opportunity.started_at);
    const end = new Date(opportunity.ended_at);

    if (now < start) return 'upcoming';
    if (now > end) return 'ended';
    return 'ongoing';
  });
}

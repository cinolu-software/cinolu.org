import { Component, input, computed, ChangeDetectionStrategy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DatePipe, TitleCasePipe } from '@angular/common';
import { LucideAngularModule, CalendarCheck, CalendarX, ExternalLink, Clock } from 'lucide-angular';
import { IOpportunity } from '@shared/models';

@Component({
  selector: 'app-dashboard-opportunity-card',
  imports: [RouterModule, DatePipe, TitleCasePipe, LucideAngularModule],
  templateUrl: './dashboard-opportunity-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardOpportunityCard {
  opportunity = input.required<IOpportunity>();

  icons = {
    calendarCheck: CalendarCheck,
    calendarX: CalendarX,
    externalLink: ExternalLink,
    clock: Clock
  };

  daysLeft = computed(() => {
    const endDate = new Date(this.opportunity().ended_at);
    const today = new Date();
    const diff = Math.ceil((endDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 0;
  });

  isEndingSoon = computed(() => this.daysLeft() <= 7 && this.daysLeft() > 0);
}

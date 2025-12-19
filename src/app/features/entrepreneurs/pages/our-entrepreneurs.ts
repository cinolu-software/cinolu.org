import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LucideAngularModule, UserRound, Users } from 'lucide-angular';
import { HeroCard } from '../../../layout/components/hero-card/hero-card';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { VenturesStore } from '../store/ventures.store';
import { EntrepreneurUserCard } from '../components/entrepreneur-user-card/entrepreneur-user-card';
import { EntrepreneurCardSkeleton } from '../components/entrepreneur-card-skeleton/entrepreneur-card-skeleton';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-our-entrepreneurs',
  providers: [VenturesStore],
  imports: [
    LucideAngularModule,
    HeroCard,
    PaginatorModule,
    EntrepreneurUserCard,
    EntrepreneurCardSkeleton,
    TranslateModule
  ],
  templateUrl: './our-entrepreneurs.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurEntrepreneurs implements OnInit {
  icons = { users: Users, userRound: UserRound };
  venturesStore = inject(VenturesStore);

  first = 0;
  rows = 8;

  ngOnInit() {
    this.venturesStore.loadVentures();
  }

  get pagedVentures() {
    const data = this.venturesStore.ventures();
    return data.slice(this.first, this.first + this.rows);
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 8;
  }

  trackByVentureId(index: number, venture: any): string {
    return venture.id || index.toString();
  }
}

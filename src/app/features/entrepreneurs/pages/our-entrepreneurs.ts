import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { LucideAngularModule, UserRound, Users, Sparkles } from 'lucide-angular';
import { HeroCard } from '../../../layout/components/hero-card/hero-card';
import { IVenture } from '@shared/models/entities.models';
import { PublicVenturesStore } from '../store/ventures.store';
import { EntrepreneurUserCard } from '../components/entrepreneur-user-card/entrepreneur-user-card';
import { EntrepreneurCardSkeleton } from '../components/entrepreneur-card-skeleton/entrepreneur-card-skeleton';
import { TranslateModule } from '@ngx-translate/core';
import { PaginationComponent } from '@shared/ui';

@Component({
  selector: 'app-our-entrepreneurs',
  providers: [PublicVenturesStore],
  imports: [
    LucideAngularModule,
    HeroCard,
    PaginationComponent,
    EntrepreneurUserCard,
    EntrepreneurCardSkeleton,
    TranslateModule
  ],
  templateUrl: './our-entrepreneurs.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OurEntrepreneurs implements OnInit {
  icons = { users: Users, userRound: UserRound, sparkles: Sparkles };
  venturesStore = inject(PublicVenturesStore);

  first = 0;
  rows = 8;

  ngOnInit() {
    this.venturesStore.loadVentures();
  }

  get pagedVentures() {
    const data = this.venturesStore.ventures();
    return data.slice(this.first, this.first + this.rows);
  }

  onPageChange(page: number) {
    this.first = (page - 1) * this.rows;
  }

  trackByVentureId(index: number, venture: IVenture): string {
    return venture.id || index.toString();
  }
}

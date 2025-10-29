import { Component, inject, OnInit } from '@angular/core';
import { LucideAngularModule, Users } from 'lucide-angular';
import { HeroCard } from '../../../layout/components/hero-card/hero-card';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { VenturesStore } from '../store/ventures.store';
import { EntrepreneurUserCard } from '../components/entrepreneur-user-card/entrepreneur-user-card';
import { EntrepreneurCardSkeleton } from '../components/entrepreneur-card-skeleton/entrepreneur-card-skeleton';

@Component({
  selector: 'app-our-entrepreneurs',
  providers: [VenturesStore],
  imports: [LucideAngularModule, HeroCard, PaginatorModule, EntrepreneurUserCard, EntrepreneurCardSkeleton],
  templateUrl: './our-entrepreneurs.html'
})
export class OurEntrepreneurs implements OnInit {
  icons = { users: Users };
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
}

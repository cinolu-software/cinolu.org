import { Component } from '@angular/core';
import { LucideAngularModule, Users } from 'lucide-angular';
import { HeroCard } from '../../../layout/components/hero-card/hero-card';
import { ENTREPRENEURS_DATA } from '../data/entrepreneurs.data';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { HighUserCard } from '../components/high-user-card/high-user-card';

@Component({
  selector: 'app-our-entrepreneurs',
  imports: [LucideAngularModule, HeroCard, PaginatorModule, HighUserCard],
  templateUrl: './our-entrepreneurs.html',
})
export class OurEntrepreneurs {
  icons = { users: Users };
  entrepreneurs = ENTREPRENEURS_DATA;

  first = 0;
  rows = 4;

  get pagedEntrepreneurs() {
    return this.entrepreneurs.slice(this.first, this.first + this.rows);
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 4;
  }
}

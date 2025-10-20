import { Component, inject, OnInit } from '@angular/core';
import { LucideAngularModule, Users } from 'lucide-angular';
import { HeroCard } from '../../../layout/components/hero-card/hero-card';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { EntrepreneursStore } from '../store/entrepreneurs.store';
import { EntrepreneurUserCard } from '../components/entrepreneur-user-card/entrepreneur-user-card';
import { EntrepreneurCardSkeleton } from '../components/entrepreneur-card-skeleton/entrepreneur-card-skeleton';

@Component({
  selector: 'app-our-entrepreneurs',
  providers: [EntrepreneursStore],
  imports: [LucideAngularModule, HeroCard, PaginatorModule, EntrepreneurUserCard, EntrepreneurCardSkeleton],
  templateUrl: './our-entrepreneurs.html',
})
export class OurEntrepreneurs implements OnInit {
  icons = { users: Users };
  entrepreneurs = inject(EntrepreneursStore);

  first = 0;
  rows = 8;
  rowsOptions: number[] = [];
  lengthTotal = 0;

  ngOnInit() {
    this.entrepreneurs.loadEntrepreneurs();

    setTimeout(() => {
      const total = this.entrepreneurs.entrepreneurs().length;
      this.lengthTotal = total;
      this.rowsOptions = this.generateRowsOptions(total);
    }, 500);
  }

  private generateRowsOptions(total: number): number[] {
    const options: number[] = [];
    const step = 8;
    for (let i = step; i <= total; i += step) {
      options.push(i);
    }
    if (!options.includes(total)) options.push(total);
    return options;
  }

  get pagedEntrepreneurs() {
    const data = this.entrepreneurs.entrepreneurs();
    return data.slice(this.first, this.first + this.rows);
  }

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 8;
  }
}

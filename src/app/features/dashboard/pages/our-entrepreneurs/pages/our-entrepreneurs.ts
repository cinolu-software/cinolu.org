import { Component, inject, OnInit } from '@angular/core';
import { LucideAngularModule, Users } from 'lucide-angular';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { EntrepreneursStore } from '../store/entrepreneurs.store';
import { EntrepreneurCardSkeleton } from '../components/entrepreneur-card-skeleton/entrepreneur-card-skeleton';

@Component({
  selector: 'app-our-entrepreneurs',
  providers: [EntrepreneursStore],
  imports: [LucideAngularModule, PaginatorModule, EntrepreneurCardSkeleton],
  templateUrl: './our-entrepreneurs.html',
})
export class OurEntrepreneurs implements OnInit {
  icons = { users: Users };
  entrepreneurs = inject(EntrepreneursStore);

  first = 0;
  rows = 8;

  ngOnInit() {
    this.entrepreneurs.loadEntrepreneurs();
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

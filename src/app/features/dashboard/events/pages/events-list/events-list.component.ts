import { Component, inject, OnInit, signal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, RefreshCcw, Edit, Trash, Download, Search } from 'lucide-angular';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EventsStore } from '../../store/events/events.store';
import { FilterEventsDto } from '../../dto/filter-events.dto';

@Component({
  selector: 'app-dashboard-events',
  templateUrl: './events-list.component.html',
  providers: [EventsStore],
  imports: [
    LucideAngularModule,
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class EventsComponent implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  searchForm: FormGroup;
  store = inject(EventsStore);
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);
  icons = { refresh: RefreshCcw, edit: Edit, trash: Trash, download: Download, search: Search };
  queryParams = signal<FilterEventsDto>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    q: this.#route.snapshot.queryParamMap.get('q')
  });

  ngOnInit(): void {
    this.loadEvents();
  }

  constructor() {
    this.searchForm = this.#fb.group({
      q: [this.queryParams().q || '', Validators.required]
    });
  }

  loadEvents(): void {
    this.store.loadEvents(this.queryParams());
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndEvents();
  }

  updateRoute(): void {
    const queryParams = this.queryParams();
    this.#router.navigate(['/dashboard/events'], { queryParams });
  }

  updateRouteAndEvents(): void {
    this.updateRoute();
    this.loadEvents();
  }

  onResetSearch(): void {
    this.searchForm.reset();
    this.queryParams.set({ page: null, q: null });
    this.updateRouteAndEvents();
  }

  onSearch(): void {
    const searchValue = this.searchForm.value.q;
    this.queryParams.set({ page: null, q: searchValue });
    this.updateRouteAndEvents();
  }
}

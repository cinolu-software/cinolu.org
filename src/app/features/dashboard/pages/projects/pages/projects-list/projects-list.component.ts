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
import { ProjectsStore } from '../../store/projects/projects.store';
import { QueryParams } from '../../../../dto/query-params.dto';

@Component({
  selector: 'app-dashboard-projects-list',
  templateUrl: './projects-list.component.html',
  providers: [ProjectsStore],
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
export class ProjectsComponent implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  searchForm: FormGroup;
  store = inject(ProjectsStore);
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);
  icons = { refresh: RefreshCcw, edit: Edit, trash: Trash, download: Download, search: Search };
  queryParams = signal<QueryParams>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    q: this.#route.snapshot.queryParamMap.get('q')
  });

  constructor() {
    this.searchForm = this.#fb.group({
      q: [this.queryParams().q || '', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.store.loadProjects(this.queryParams());
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndProjects();
  }

  updateRoute(): void {
    const queryParams = this.queryParams();
    this.#router.navigate(['/dashboard/projects'], { queryParams });
  }

  updateRouteAndProjects(): void {
    this.updateRoute();
    this.loadProjects();
  }

  onResetSearch(): void {
    this.searchForm.reset();
    this.queryParams.set({ page: null, q: null });
    this.updateRouteAndProjects();
  }

  onSearch(): void {
    const searchValue = this.searchForm.value.q;
    this.queryParams.set({ page: null, q: searchValue });
    this.updateRouteAndProjects();
  }
}

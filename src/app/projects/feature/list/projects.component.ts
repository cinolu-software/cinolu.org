import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectCardComponent } from '../../ui/project-card/project-card.component';
import { ProgramCardSkeletonComponent } from '../../ui/project-card-skeleton/project-card-skeleton.component';
import { QueryParams } from '../../utils/types/query-params.type';
import { MultiSelectModule, MultiSelectChangeEvent } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { ProjectsStore } from '../../data-access/projects.store';
import { ProjectCategoriesStore } from '../../data-access/categories.store';

@Component({
  selector: 'app-projects',
  providers: [ProjectsStore, ProjectCategoriesStore],
  imports: [
    CommonModule,
    NgxPaginationModule,
    ChipModule,
    MultiSelectModule,
    NgOptimizedImage,
    ProjectCardComponent,
    FormsModule,
    ProgramCardSkeletonComponent
  ],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  store = inject(ProjectsStore);
  categoriesStore = inject(ProjectCategoriesStore);
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParams?.['page']) || null,
    categories: this.#route.snapshot.queryParams?.['categories'] || null
  });

  ngOnInit(): void {
    this.store.loadProjects(this.queryParams());
    this.categoriesStore.loadCategories();
  }

  onFilterChange(event: MultiSelectChangeEvent, filter: 'page' | 'categories'): void {
    this.queryParams().page = null;
    this.queryParams()[filter] = event.value;
    this.updateRouteAndprojects();
  }

  onClear(): void {
    this.queryParams().page = null;
    this.queryParams().categories = null;
    this.updateRouteAndprojects();
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage;
    this.updateRouteAndprojects();
  }

  updateRoute(): void {
    const { page, categories } = this.queryParams();
    const queryParams = { page, categories };
    this.#router.navigate(['/programs'], { queryParams });
  }

  updateRouteAndprojects(): void {
    this.updateRoute();
    this.store.loadProjects(this.queryParams());
  }
}

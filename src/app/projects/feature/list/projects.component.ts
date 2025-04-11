import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ICategory, IProject } from 'app/shared/utils/types/models.type';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectCardComponent } from '../../ui/project-card/project-card.component';
import { ProgramCardSkeletonComponent } from '../../ui/project-card-skeleton/project-card-skeleton.component';
import { QueryParams } from '../../utils/types/query-params.type';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { ProjectsService } from '../../data-access/projects.service';
import { MultiSelectModule, MultiSelectChangeEvent } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';

@Component({
  selector: 'app-projects',
  providers: [ProjectsService],
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
  #projectsService = inject(ProjectsService);
  skeletonArray = Array(9).fill(0);
  projects$: Observable<IAPIResponse<[IProject[], number]>>;
  categories$: Observable<IAPIResponse<ICategory[]>>;
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParams?.page) || null,
    categories: this.#route.snapshot.queryParams?.categories
  });

  ngOnInit(): void {
    this.loadProjects();
    this.categories$ = this.#projectsService.getCategories();
  }

  onFilterChange(event: MultiSelectChangeEvent, filter: string): void {
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

  loadProjects(): void {
    this.projects$ = this.#projectsService.getProjects(this.queryParams());
  }

  updateRoute(): void {
    const { page, categories } = this.queryParams();
    const queryParams = { page, categories };
    this.#router.navigate(['/programs'], { queryParams });
  }

  updateRouteAndprojects(): void {
    this.updateRoute();
    this.loadProjects();
  }
}

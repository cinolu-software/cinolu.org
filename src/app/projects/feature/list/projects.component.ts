import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectCardComponent } from '../../ui/project-card/project-card.component';
import { ProgramCardSkeletonComponent } from '../../ui/project-card-skeleton/project-card-skeleton.component';
import { QueryParams } from '../../utils/types/query-params.type';
import { Observable } from 'rxjs';
import { ProjectsService } from '../../data-access/projects.service';
import { MultiSelectModule, MultiSelectChangeEvent } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IProject, ICategory } from '../../../shared/utils/types/models.type';

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
    ProgramCardSkeletonComponent,
  ],
  templateUrl: './projects.component.html',
})
export class ProjectsComponent implements OnInit {
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  #projectsService = inject(ProjectsService);
  skeletonArray = Array(9).fill(0);
  projects$: Observable<IAPIResponse<[IProject[], number]>> | undefined;
  categories$: Observable<IAPIResponse<ICategory[]>> | undefined;
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParams?.['page']) || null,
    categories: this.#route.snapshot.queryParams?.['categories'] || null,
  });

  ngOnInit(): void {
    this.loadProjects();
    this.categories$ = this.#projectsService.getCategories();
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

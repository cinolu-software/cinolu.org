import { CommonModule, NgClass, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProject } from '@shared/models/entities.models';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectCard } from '../../components/project-card/project-card';
import { ProgramCardSkeletonComponent } from '../../components/project-card-skeleton/project-card-skeleton';
import { MultiSelectModule, MultiSelectChangeEvent } from 'primeng/multiselect';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { ProjectsStore } from '../../store/projects.store';
import { ProjectCategoriesStore } from '../../store/categories.store';
import { FilterProjectsDto } from '../../dto/filter-projects.dto';
import { TranslateModule } from '@ngx-translate/core';
import { CirclePlus, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-projects-list',
  providers: [ProjectsStore, ProjectCategoriesStore],
  imports: [
    CommonModule,
    NgClass,
    NgxPaginationModule,
    ChipModule,
    MultiSelectModule,
    NgOptimizedImage,
    ProjectCard,
    FormsModule,
    ProgramCardSkeletonComponent,
    TranslateModule,
    LucideAngularModule
  ],
  templateUrl: './list-projects.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListProjects implements OnInit {
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  store = inject(ProjectsStore);
  categoriesStore = inject(ProjectCategoriesStore);
  queryParams = signal<FilterProjectsDto>({
    page: this.#route.snapshot.queryParams?.['page'],
    categories: this.#route.snapshot.queryParams?.['categories'],
    status: this.#route.snapshot.queryParams?.['status'] ?? null
  });

  statusOptions: { value: FilterProjectsDto['status']; labelKey: string }[] = [
    { value: null, labelKey: 'projects.list.filter_status_all' },
    { value: 'past', labelKey: 'projects.list.filter_status_past' },
    { value: 'current', labelKey: 'projects.list.filter_status_current' },
    { value: 'future', labelKey: 'projects.list.filter_status_future' }
  ];

  icons = {
    circlePlus: CirclePlus
  };

  ngOnInit(): void {
    this.store.loadProjects(this.queryParams());
  }

  trackByProjectId(index: number, project: IProject): string {
    return project.id || index.toString();
  }

  onFilterChange(event: MultiSelectChangeEvent, filter: 'page' | 'categories'): void {
    this.queryParams.update((p: FilterProjectsDto) => ({ ...p, page: null, [filter]: event.value }));
    this.updateRouteAndprojects();
  }

  onClear(): void {
    this.queryParams.update((p: FilterProjectsDto) => ({ ...p, page: null, categories: null }));
    this.updateRouteAndprojects();
  }

  onStatusChange(status: FilterProjectsDto['status']): void {
    this.queryParams.update((p: FilterProjectsDto) => ({ ...p, page: null, status }));
    this.updateRouteAndprojects();
  }

  onPageChange(currentPage: number): void {
    this.queryParams.update((p: FilterProjectsDto) => ({
      ...p,
      page: currentPage === 1 ? null : currentPage.toString()
    }));
    this.updateRouteAndprojects();
  }

  updateRoute(): void {
    const { page, categories, status } = this.queryParams();
    const queryParams: Record<string, string | string[] | null | undefined> = {
      page,
      categories,
      status: status ?? undefined
    };
    this.#router.navigate(['/programs'], { queryParams }).then();
  }

  updateRouteAndprojects(): void {
    this.updateRoute();
    this.store.loadProjects(this.queryParams());
  }
}

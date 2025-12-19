import { CommonModule, NgOptimizedImage } from '@angular/common';
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
    categories: this.#route.snapshot.queryParams?.['categories']
  });

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
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndprojects();
  }

  updateRoute(): void {
    const { page, categories } = this.queryParams();
    const queryParams = { page, categories };
    this.#router.navigate(['/programs'], { queryParams }).then();
  }

  updateRouteAndprojects(): void {
    this.updateRoute();
    this.store.loadProjects(this.queryParams());
  }
}

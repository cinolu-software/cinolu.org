import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { IProject } from 'app/shared/utils/types/models.type';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProjectCardComponent } from '../../ui/project-card/project-card.component';
import { ProgramCardSkeletonComponent } from '../../ui/project-card-skeleton/project-card-skeleton.component';
import { QueryParams } from '../../utils/types/query-params.type';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { ProjectsService } from '../../data-access/projects.service';

@Component({
  selector: 'app-projects',
  providers: [ProjectsService],
  imports: [CommonModule, NgxPaginationModule, ProjectCardComponent, ProgramCardSkeletonComponent],
  templateUrl: './projects.component.html'
})
export class ProjectsComponent implements OnInit {
  skeletonArray = Array(9).fill(0);
  projects$: Observable<IAPIResponse<[IProject[], number]>>;
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  #projectsService = inject(ProjectsService);
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParams?.page) || null,
    type: this.#route.snapshot.queryParams?.type || null
  });

  ngOnInit(): void {
    this.loadProjects();
  }

  // onFilterChange(event: MatChipListboxChange, filter: string): void {
  //   this.queryParams().page = null;
  //   this.queryParams()[filter] = event.value === 'Tous' ? null : event.value;
  //   this.updateRouteAndprojects();
  // }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage;
    this.updateRouteAndprojects();
  }

  loadProjects(): void {
    this.projects$ = this.#projectsService.getProjects(this.queryParams());
  }

  updateRoute(): void {
    const { page, type } = this.queryParams();
    const queryParams = { page, type };
    this.#router.navigate(['/projects'], { queryParams });
  }

  updateRouteAndprojects(): void {
    this.updateRoute();
    this.loadProjects();
  }
}

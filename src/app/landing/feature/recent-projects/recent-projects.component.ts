import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IProject } from '../../../shared/utils/types/models.type';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../../projects/ui/project-card/project-card.component';
import { ProgramCardSkeletonComponent } from '../../../projects/ui/project-card-skeleton/project-card-skeleton.component';
import { RouterModule } from '@angular/router';
import { ProjectsService } from '../../../projects/data-access/projects.service';
import { CarouselModule } from 'primeng/carousel';
import { NgIcon } from '@ng-icons/core';
import { carouselConfig } from 'app/landing/utils/config/carousel.config';

@Component({
  selector: 'app-recent-projects',
  providers: [ProjectsService],
  imports: [CommonModule, ProjectCardComponent, CarouselModule, ProgramCardSkeletonComponent, RouterModule, NgIcon],
  templateUrl: './recent-projects.component.html'
})
export class RecentProjectsComponent implements OnInit {
  projects$: Observable<IAPIResponse<IProject[]>>;
  #projectsService = inject(ProjectsService);
  carouselConfig = carouselConfig;

  ngOnInit(): void {
    this.projects$ = this.#projectsService.findRecent();
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IProject } from '../../../shared/utils/types/models.type';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../../shared/ui/project-card/project-card.component';
import { ProgramCardSkeletonComponent } from '../../../shared/ui/project-card-skeleton/project-card-skeleton.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ProjectsService } from '../../../projects/data-access/projects.service';

@Component({
  selector: 'app-recent-projects',
  providers: [ProjectsService],
  imports: [CommonModule, ProjectCardComponent, ProgramCardSkeletonComponent, RouterModule, MatIconModule],
  templateUrl: './recent-projects.component.html'
})
export class RecentProjectsComponent implements OnInit {
  projects$: Observable<IAPIResponse<IProject[]>>;
  #projectsService = inject(ProjectsService);

  ngOnInit(): void {
    this.projects$ = this.#projectsService.findRecent();
  }
}

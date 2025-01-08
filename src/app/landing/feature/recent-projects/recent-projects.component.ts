import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IProject } from '../../../shared/utils/types/models.type';
import { CommonModule } from '@angular/common';
import { ProgramCardComponent } from '../../../shared/ui/program-card/program-card.component';
import { ProgramCardSkeletonComponent } from '../../../shared/ui/program-card-skeleton/program-card-skeleton.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ProjectsService } from '../../../projects/data-access/projects.service';

@Component({
  selector: 'app-recent-programs',
  providers: [ProjectsService],
  imports: [CommonModule, ProgramCardComponent, ProgramCardSkeletonComponent, RouterModule, MatIconModule],
  templateUrl: './recent-projects.component.html'
})
export class RecentProgramsComponent implements OnInit {
  programs$: Observable<IAPIResponse<IProject[]>>;
  #projectsService = inject(ProjectsService);

  ngOnInit(): void {
    this.programs$ = this.#projectsService.findRecent();
  }
}

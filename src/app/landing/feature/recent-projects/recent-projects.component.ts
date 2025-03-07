import { afterNextRender, Component, inject, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IProject } from '../../../shared/utils/types/models.type';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../../shared/ui/project-card/project-card.component';
import { ProgramCardSkeletonComponent } from '../../../shared/ui/project-card-skeleton/project-card-skeleton.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ProjectsService } from '../../../projects/data-access/projects.service';
import { owlOptionsRecent } from '../../utils/config/owl.config';
import { CarouselModule } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-recent-projects',
  providers: [ProjectsService],
  imports: [
    CommonModule,
    ProjectCardComponent,
    CarouselModule,
    ProgramCardSkeletonComponent,
    RouterModule,
    MatIconModule
  ],
  templateUrl: './recent-projects.component.html'
})
export class RecentProjectsComponent implements OnInit {
  projects$: Observable<IAPIResponse<IProject[]>>;
  #projectsService = inject(ProjectsService);
  isBrowser = signal<boolean>(false);
  owlOptions = owlOptionsRecent;

  constructor() {
    afterNextRender(() => this.isBrowser.set(true));
  }

  ngOnInit(): void {
    this.projects$ = this.#projectsService.findRecent();
  }
}

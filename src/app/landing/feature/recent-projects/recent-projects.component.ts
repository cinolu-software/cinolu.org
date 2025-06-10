import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IProject } from '../../../shared/utils/types/models.type';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../../projects/ui/project-card/project-card.component';
import { RouterModule } from '@angular/router';
import { ProjectsService } from '../../../projects/data-access/projects.service';
import { CarouselModule } from 'primeng/carousel';
import { carouselConfig } from '../../utils/config/carousel.config';
import { LucideAngularModule, MoveUpRight, ArrowLeft, ArrowRight } from 'lucide-angular';

@Component({
  selector: 'app-recent-projects',
  providers: [ProjectsService],
  imports: [CommonModule, ProjectCardComponent, CarouselModule, RouterModule, LucideAngularModule],
  templateUrl: './recent-projects.component.html',
})
export class RecentProjectsComponent implements OnInit {
  projects$: Observable<IAPIResponse<IProject[]>> | undefined;
  #projectsService = inject(ProjectsService);
  carouselConfig = carouselConfig;
  icons = {
    moveUpRight: MoveUpRight,
    moveLeft: ArrowLeft,
    moveRight: ArrowRight,
  };

  ngOnInit(): void {
    this.projects$ = this.#projectsService.getRecent();
  }
}

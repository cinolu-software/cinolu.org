import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { carouselConfig } from '../../config/carousel.config';
import { LucideAngularModule, MoveUpRight, ArrowLeft, ArrowRight } from 'lucide-angular';
import { RecentProjectsStore } from '../../../projects/store/recent-projects.store';
import { ProgramCardSkeletonComponent } from '../../../projects/components/project-card-skeleton/project-card-skeleton';
import { ProjectCard } from '../../../projects/components/project-card/project-card';
import { FadeInOnScrollDirective } from '../../../../shared/directives/animations-on-scroll.directive';
import { Button } from 'primeng/button';
import { IProject } from '../../../../shared/models';

@Component({
  selector: 'app-recent-projects',
  providers: [RecentProjectsStore],
  imports: [
    CommonModule,
    ProjectCard,
    CarouselModule,
    RouterModule,
    LucideAngularModule,
    ProgramCardSkeletonComponent,
    FadeInOnScrollDirective,
    Button
  ],
  templateUrl: './recent-projects.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentProjects {
  store = inject(RecentProjectsStore);
  carouselConfig = carouselConfig;
  icons = {
    moveUpRight: MoveUpRight,
    moveLeft: ArrowLeft,
    moveRight: ArrowRight
  };

  constructor() {
    // Charger les projets uniquement quand le composant est instancié
    this.store.loadProjects();
  }

  trackByProjectId(_index: number, project: IProject): string {
    return project.id;
  }
}

import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { carouselConfig } from '../../config/carousel.config';
import {
  LucideAngularModule,
  MoveUpRight,
  ArrowLeft,
  ArrowRight,
} from 'lucide-angular';
import { RecentProjectsStore } from '../../../projects/store/recent-projects.store';
import { ProgramCardSkeletonComponent } from '../../../projects/components/project-card-skeleton/project-card-skeleton';
import { ProjectCard } from '../../../projects/components/project-card/project-card';
import { FadeInOnScrollDirective } from '../../../../shared/directives/animations-on-scroll.directive';
import { Button } from "primeng/button";

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
    Button,
  ],
  templateUrl: './recent-projects.html',
})
export class RecentProjects {
  store = inject(RecentProjectsStore);
  carouselConfig = carouselConfig;
  icons = {
    moveUpRight: MoveUpRight,
    moveLeft: ArrowLeft,
    moveRight: ArrowRight,
  };
}

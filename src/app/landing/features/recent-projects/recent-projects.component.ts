import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectCardComponent } from '../../../projects/ui/project-card/project-card.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { carouselConfig } from '../../utils/config/carousel.config';
import { LucideAngularModule, MoveUpRight, ArrowLeft, ArrowRight } from 'lucide-angular';
import { RecentProjectsStore } from '../../data-access/recent-projects.store';
import { ProgramCardSkeletonComponent } from '../../../projects/ui/project-card-skeleton/project-card-skeleton.component';

@Component({
  selector: 'app-recent-projects',
  providers: [RecentProjectsStore],
  imports: [
    CommonModule,
    ProjectCardComponent,
    CarouselModule,
    RouterModule,
    LucideAngularModule,
    ProgramCardSkeletonComponent
  ],
  templateUrl: './recent-projects.component.html'
})
export class RecentProjectsComponent {
  store = inject(RecentProjectsStore);
  carouselConfig = carouselConfig;
  icons = {
    moveUpRight: MoveUpRight,
    moveLeft: ArrowLeft,
    moveRight: ArrowRight
  };
}

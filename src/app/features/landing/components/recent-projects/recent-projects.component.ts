import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'primeng/carousel';
import { carouselConfig } from '../../data/carousel.config';
import { LucideAngularModule, MoveUpRight, ArrowLeft, ArrowRight } from 'lucide-angular';
import { RecentProjectsStore } from '../../../projects/store/recent-projects.store';
import { ProgramCardSkeletonComponent } from '../../../projects/components/project-card-skeleton/project-card-skeleton.component';
import { ProjectCardComponent } from '../../../projects/components/project-card/project-card.component';

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
  icons = { moveUpRight: MoveUpRight, moveLeft: ArrowLeft, moveRight: ArrowRight };
}

import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ProjectOverviewComponent } from './overview/overview.component';
import { ProjectSkeletonComponent } from '../../ui/project-skeleton/project-skeleton.component';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { ProjectStore } from '../../data-access/project.store';

@Component({
  selector: 'app-project',
  providers: [ProjectStore],
  imports: [
    CommonModule,
    NgOptimizedImage,
    FormsModule,
    ApiImgPipe,
    ProjectOverviewComponent,
    ProjectSkeletonComponent,
    LucideAngularModule
  ],
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
  #route = inject(ActivatedRoute);
  #location = inject(Location);
  #slug = this.#route.snapshot.paramMap.get('slug') || '';
  store = inject(ProjectStore);
  icons = {
    moveLeft: ArrowLeft
  };

  ngOnInit(): void {
    this.store.loadProject(this.#slug);
  }

  back(): void {
    this.#location.back();
  }
}

import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectOverviewComponent } from './overview/overview.component';
import { ProjectSkeletonComponent } from '../../ui/project-skeleton/project-skeleton.component';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { ProjectStore } from '../../data-access/project.store';
import { ActivatedRoute } from '@angular/router';

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
  #location = inject(Location);
  #route = inject(ActivatedRoute);
  store = inject(ProjectStore);
  icons = { moveLeft: ArrowLeft };

  ngOnInit(): void {
    const slug = this.#route.snapshot.params['slug'];
    this.store.loadProject(slug);
  }

  onGoBack(): void {
    this.#location.back();
  }
}

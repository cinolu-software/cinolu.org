import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectOverviewComponent } from './overview/overview.component';
import { ProjectSkeletonComponent } from '../../components/project-skeleton/project-skeleton.component';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { ProjectStore } from '../../store/project.store';
import { ActivatedRoute } from '@angular/router';
import { ApiImgPipe } from '../../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-project-detail',
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
  templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit {
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

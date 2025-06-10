import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectOverviewComponent } from './overview/overview.component';
import { ProjectsService } from '../../data-access/projects.service';
import { ProjectSkeletonComponent } from '../../ui/project-skeleton/project-skeleton.component';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { IProject } from '../../../shared/utils/types/models.type';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';

@Component({
  selector: 'app-project',
  providers: [ProjectsService],
  imports: [
    CommonModule,
    NgOptimizedImage,
    FormsModule,
    ApiImgPipe,
    ProjectOverviewComponent,
    ProjectSkeletonComponent,
    LucideAngularModule,
  ],
  templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit {
  project$: Observable<IAPIResponse<IProject>> | undefined;
  #projectsService = inject(ProjectsService);
  #route = inject(ActivatedRoute);
  #location = inject(Location);
  #slug = this.#route.snapshot.paramMap.get('slug') || '';
  icons = {
    moveLeft: ArrowLeft,
  };

  ngOnInit(): void {
    this.project$ = this.#projectsService.getProject(this.#slug);
  }

  back(): void {
    this.#location.back();
  }
}

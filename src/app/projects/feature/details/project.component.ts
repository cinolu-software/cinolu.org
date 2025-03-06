import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { IProject, IUser } from 'app/shared/utils/types/models.type';
import { ActivatedRoute, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ApiImgPipe } from 'app/shared/pipes/api-img.pipe';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { ProjectOverviewComponent } from './overview/overview.component';
import { ProjectApplicationComponent } from './application/application.component';
import { Store } from '@ngrx/store';
import { selectUser } from 'app/shared/store/auth/auth.reducers';
import { ProjectsService } from '../../data-access/projects.service';
import { ProjectSkeletonComponent } from '../../ui/project-skeleton/project-skeleton.component';

@Component({
  selector: 'app-project',
  providers: [ProjectsService],
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    FormsModule,
    ApiImgPipe,
    ProjectApplicationComponent,
    ProjectOverviewComponent,
    ProjectSkeletonComponent
  ],
  templateUrl: './project.component.html'
})
export class ProjectComponent implements OnInit {
  project$: Observable<IAPIResponse<IProject>>;
  user$: Observable<IUser>;
  #projectsService = inject(ProjectsService);
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #store = inject(Store);
  #location = inject(Location);
  activeTab = signal<string | null>(null);
  #id: string;

  constructor() {
    this.#id = this.#route.snapshot.paramMap.get('id');
    this.user$ = this.#store.select(selectUser);
    this.activeTab.set(this.#route.snapshot.queryParams?.tab);
  }

  ngOnInit(): void {
    this.project$ = this.#projectsService.getProject(this.#id);
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
    const queryParams = { tab };
    this.#router.navigate(['/projects', this.#id], { queryParams });
  }

  back(): void {
    this.#location.back();
  }
}

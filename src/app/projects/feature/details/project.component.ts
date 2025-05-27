import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { ProjectOverviewComponent } from './overview/overview.component';
import { Store } from '@ngrx/store';
import { ProjectsService } from '../../data-access/projects.service';
import { ProjectSkeletonComponent } from '../../ui/project-skeleton/project-skeleton.component';
import { NgIcon } from '@ng-icons/core';
import { ProjectApplicationComponent } from './application/application.component';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { IAPIResponse } from '../../../shared/services/api/types/api-response.type';
import { selectUser } from '../../../shared/store/auth/auth.reducers';
import { IProject, IUser } from '../../../shared/utils/types/models.type';

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
    NgIcon,
    ProjectApplicationComponent,
  ],
  templateUrl: './project.component.html',
})
export class ProjectComponent implements OnInit {
  project$: Observable<IAPIResponse<IProject>> | undefined;
  user$: Observable<IUser | null>;
  #projectsService = inject(ProjectsService);
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #store = inject(Store);
  #location = inject(Location);
  activeTab = signal<string | null>(null);
  #id: string | null;

  constructor() {
    this.#id = this.#route.snapshot.paramMap.get('id');
    this.user$ = this.#store.select(selectUser);
    this.activeTab.set(this.#route.snapshot.queryParams['tab']);
  }

  ngOnInit(): void {
    if (!this.#id) return;
    this.project$ = this.#projectsService.getProject(this.#id);
  }

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
    const queryParams = { tab };
    this.#router.navigate(['/programs', this.#id], { queryParams });
  }

  back(): void {
    this.#location.back();
  }
}

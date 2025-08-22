import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectOverviewComponent } from './overview/overview';
import { ProjectSkeleton } from '../../components/project-skeleton/project-skeleton';
import { LucideAngularModule, ArrowLeft } from 'lucide-angular';
import { ProjectStore } from '../../store/project.store';
import { ActivatedRoute } from '@angular/router';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-project-detail',
  providers: [ProjectStore],
  imports: [
    CommonModule,
    NgOptimizedImage,
    FormsModule,
    ApiImgPipe,
    ProjectOverviewComponent,
    ProjectSkeleton,
    LucideAngularModule,
  ],
  templateUrl: './detail-project.html',
})
export class DetailProject implements OnInit {
  #route = inject(ActivatedRoute);
  store = inject(ProjectStore);
  icons = { moveLeft: ArrowLeft };

  ngOnInit(): void {
    const slug = this.#route.snapshot.params['slug'];
    this.store.loadProject(slug);
  }
}

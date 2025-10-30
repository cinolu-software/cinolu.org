import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectSkeleton } from '../../components/project-skeleton/project-skeleton';
import {
  LucideAngularModule,
  ArrowLeft,
  FileText,
  NotepadText,
  CalendarDays,
  MapPin,
  Tag,
  ArrowRight,
  FileLock2,
  CalendarSync,
  CalendarX,
  MapPinHouse,
} from 'lucide-angular';
import { ProjectStore } from '../../store/project.store';
import { ActivatedRoute } from '@angular/router';
import { ApiImgPipe } from '../../../../common/pipes/api-img.pipe';
import { IProject } from '../../../../common/models/entities.models';
import { GalleriaModule } from 'primeng/galleria';
import { Button } from 'primeng/button';
import { QuillViewComponent } from 'ngx-quill';
import { carouselConfig } from '../../../landing/config/carousel.config';

@Component({
  selector: 'app-project-detail',
  providers: [ProjectStore],
  imports: [
    CommonModule,
    FormsModule,
    ApiImgPipe,
    ProjectSkeleton,
    LucideAngularModule,
    NgOptimizedImage,
    GalleriaModule,
    Button,
    QuillViewComponent,
  ],
  templateUrl: './detail-project.html',
})
export class DetailProject implements OnInit {
  #route = inject(ActivatedRoute);
  store = inject(ProjectStore);

  icons = {
    moveLeft: ArrowLeft,
    fileText: FileText,
    notepadText: NotepadText,
    calendarDays: CalendarDays,
    mapPin: MapPin,
    tag: Tag,
    arrow: ArrowRight,
    fileLock: FileLock2,
    calendarSync: CalendarSync,
    calendarX: CalendarX,
    map: MapPinHouse,
    calendarCheck: CalendarX,
  };

  responsiveOptions = carouselConfig;
  ngOnInit(): void {
    const slug = this.#route.snapshot.params['slug'];
    this.store.loadProject(slug);
  }

  getStatut(project: IProject): string {
    const now = new Date();
    const startedAt = new Date(project.started_at);
    const endedAt = new Date(project.ended_at);

    if (startedAt <= now && endedAt >= now) {
      return 'En cours';
    } else if (startedAt > now) {
      return 'À venir';
    } else {
      return 'Terminé';
    }
  }
}

import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, effect, inject, model, OnInit } from '@angular/core';
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
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { IImage, IProject } from '../../../../shared/models/entities.models';
import { GalleryProjectStore } from '../../store/galleries.projet.store';
import { GalleriaModule } from 'primeng/galleria';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-project-detail',
  providers: [ProjectStore, GalleryProjectStore],
  imports: [
    CommonModule,
    NgOptimizedImage,
    FormsModule,
    ApiImgPipe,
    ProjectSkeleton,
    LucideAngularModule,
    GalleriaModule,
    Button,
  ],
  templateUrl: './detail-project.html',
})
export class DetailProject implements OnInit {
  images = model<IImage[]>([]);
  #route = inject(ActivatedRoute);
  store = inject(ProjectStore);
  galleryProjectStore = inject(GalleryProjectStore);

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
  };

  constructor() {
    effect(() => {
      const gallery = this.galleryProjectStore.gallery();
      this.images.set(gallery ?? []);
    });
  }

  responsiveOptions = [
    {
      breakpoint: '1300px',
      numVisible: 4,
    },
    {
      breakpoint: '575px',
      numVisible: 1,
    },
  ];

  ngOnInit(): void {
    const slug = this.#route.snapshot.params['slug'];
    this.store.loadProject(slug);
    this.galleryProjectStore.loadGallery(slug);
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

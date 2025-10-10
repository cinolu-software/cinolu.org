import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, effect, inject, model, OnInit } from '@angular/core';
import { EventSkeleton } from '../../components/event-detail-skeleton/event-skeleton';
import { GalleriaModule } from 'primeng/galleria';
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
} from 'lucide-angular';
import { EventStore } from '../../store/event.store';
import { ActivatedRoute } from '@angular/router';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { Button } from 'primeng/button';
import { IEvent, IImage } from '../../../../shared/models/entities.models';
import { GalleryEventStore } from '../../store/galleries.event.store';
import { carouselConfig } from '../../../landing/config/carousel.config';

@Component({
  selector: 'app-event',
  standalone: true,
  providers: [EventStore, GalleryEventStore],
  imports: [CommonModule, EventSkeleton, LucideAngularModule, NgOptimizedImage, ApiImgPipe, Button, GalleriaModule],
  templateUrl: './detail-event.html',
})
export class DetailEvent implements OnInit {
  images = model<IImage[]>([]);

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
  };

  #route = inject(ActivatedRoute);
  store = inject(EventStore);
  galleryStore = inject(GalleryEventStore);

  responsiveOptions = carouselConfig;

  constructor() {
    effect(() => {
      const gallery = this.galleryStore.gallery();
      this.images.set(gallery ?? []);
    });
  }

  ngOnInit(): void {
    const slug = this.#route.snapshot.params['slug'];
    this.store.loadEvent(slug);
    this.galleryStore.loadGallery(slug);
  }

  getStatut(project: IEvent): string {
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

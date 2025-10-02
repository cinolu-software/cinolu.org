import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EventSkeleton } from '../../components/event-detail-skeleton/event-skeleton';
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
} from 'lucide-angular';
import { EventStore } from '../../store/event.store';
import { ActivatedRoute } from '@angular/router';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { Button } from 'primeng/button';
import { IEvent } from '../../../../shared/models/entities.models';
import { GalleryEventStore } from '../../store/galleries.event.store';

@Component({
  selector: 'app-event',
  providers: [EventStore, GalleryEventStore],
  imports: [
    CommonModule,
    EventSkeleton,
    LucideAngularModule,
    NgOptimizedImage,
    ApiImgPipe,
    Button,
  ],
  templateUrl: './detail-event.html',
})
export class DetailEvent implements OnInit {
  #location = inject(Location);
  icons = {
    moveLeft: ArrowLeft,
    fileText: FileText,
    notepadText: NotepadText,
    calendarDays: CalendarDays,
    mapPin: MapPin,
    tag: Tag,
    arrow: ArrowRight,
    fileLock: FileLock2,
  };
  #route = inject(ActivatedRoute);
  store = inject(EventStore);
  galleryStore = inject(GalleryEventStore);

  ngOnInit(): void {
    const slug = this.#route.snapshot.params['slug'];
    this.store.loadEvent(slug);
    this.galleryStore.loadGallery(slug);
  }

  onGoBack(): void {
    this.#location.back();
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

import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EventSkeleton } from '../../components/event-detail-skeleton/event-skeleton';
import {
  LucideAngularModule,
  ArrowLeft,
  FileText,
  NotepadText,
} from 'lucide-angular';
import { EventStore } from '../../store/event.store';
import { ActivatedRoute } from '@angular/router';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-event',
  providers: [EventStore],
  imports: [
    CommonModule,
    EventSkeleton,
    LucideAngularModule,
    NgOptimizedImage,
    ApiImgPipe,
  ],
  templateUrl: './detail-event.html',
})
export class DetailEvent implements OnInit {
  #location = inject(Location);
  icons = { moveLeft: ArrowLeft, fileText: FileText, notepadText: NotepadText };
  #route = inject(ActivatedRoute);
  store = inject(EventStore);

  ngOnInit(): void {
    const slug = this.#route.snapshot.params['slug'];
    this.store.loadEvent(slug);
  }

  onGoBack(): void {
    this.#location.back();
  }
}

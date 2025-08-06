import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EventSkeletonComponent } from '../../components/event-detail-skeleton/event-skeleton.component';
import { LucideAngularModule, ArrowLeft, FileText, NotepadText } from 'lucide-angular';
import { EventStore } from '../../store/event.store';
import { ActivatedRoute } from '@angular/router';
import { ApiImgPipe } from '../../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-event',
  providers: [EventStore],
  imports: [CommonModule, EventSkeletonComponent, LucideAngularModule, NgOptimizedImage, ApiImgPipe],
  templateUrl: './event-detail.component.html'
})
export class EventDetailComponent implements OnInit {
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

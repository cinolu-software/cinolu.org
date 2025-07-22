import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { EventSkeletonComponent } from '../../ui/event-skeleton/event-skeleton.component';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { LucideAngularModule, ArrowLeft, FileText, NotepadText } from 'lucide-angular';
import { EventStore } from '../../data-access/event.store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event',
  providers: [EventStore],
  imports: [CommonModule, EventSkeletonComponent, LucideAngularModule, NgOptimizedImage, ApiImgPipe],
  templateUrl: './event.component.html'
})
export class EventComponent implements OnInit {
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

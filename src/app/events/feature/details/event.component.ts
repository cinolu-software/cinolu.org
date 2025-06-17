import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventSkeletonComponent } from '../../ui/event-skeleton/event-skeleton.component';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { LucideAngularModule, ArrowLeft, FileText, NotepadText } from 'lucide-angular';
import { EventStore } from '../../data-access/event.store';

@Component({
  selector: 'app-event',
  providers: [EventStore],
  imports: [CommonModule, EventSkeletonComponent, LucideAngularModule, NgOptimizedImage, ApiImgPipe],
  templateUrl: './event.component.html'
})
export class EventComponent implements OnInit {
  #route = inject(ActivatedRoute);
  #location = inject(Location);
  #slug = this.#route.snapshot.paramMap.get('slug') || '';
  icons = {
    moveLeft: ArrowLeft,
    fileText: FileText,
    notepadText: NotepadText
  };
  store = inject(EventStore);

  ngOnInit(): void {
    this.store.loadEvent(this.#slug);
  }

  back(): void {
    this.#location.back();
  }
}

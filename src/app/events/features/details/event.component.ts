import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
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
export class EventComponent {
  #location = inject(Location);
  icons = {
    moveLeft: ArrowLeft,
    fileText: FileText,
    notepadText: NotepadText
  };
  store = inject(EventStore);

  back(): void {
    this.#location.back();
  }
}

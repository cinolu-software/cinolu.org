import { Component, input } from '@angular/core';
import { IEvent } from '../../../../shared/models/entities.models';
import {
  BookmarkCheck,
  Calendar1,
  CalendarCheck,
  CalendarMinus,
  FileText,
  FolderOpenDot,
  LucideAngularModule,
  MapPin,
  MessageCircleMore,
  MoveRight,
  MoveUpRight,
  NotepadText,
  ThumbsUp,
} from 'lucide-angular';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { Tag } from 'primeng/tag';
import { Button } from 'primeng/button';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-subprogram-event-card',
  imports: [LucideAngularModule, CommonModule, NgOptimizedImage, ApiImgPipe, Tag, Button, QuillModule],
  templateUrl: './subprogram-event-card.html',
})
export class SubprogramEventCard {
  icons = {
    fileText: FileText,
    notepadText: NotepadText,
    tag: BookmarkCheck,
    comment: MessageCircleMore,
    like: ThumbsUp,
    calendar: Calendar1,
    moveUp: MoveUpRight,
    thumbsUp: ThumbsUp,
    program: FolderOpenDot,
    arrow: MoveRight,
    place: MapPin,
    startedAt: CalendarCheck,
    endedAt: CalendarMinus,
  };

  event = input.required<IEvent>();

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

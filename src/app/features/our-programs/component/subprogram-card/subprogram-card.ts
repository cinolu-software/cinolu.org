import { Component, input } from '@angular/core';
import { IProject } from '../../../../shared/models/entities.models';
import {
  Calendar1,
  ArrowLeft,
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
  Tags,
  ThumbsUp,
  UserPlus,
} from 'lucide-angular';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { Button } from 'primeng/button';
import { Tag } from 'primeng/tag';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-subprogram-card',
  imports: [LucideAngularModule, CommonModule, NgOptimizedImage, ApiImgPipe, Button, Tag, QuillModule],
  templateUrl: './subprogram-card.html',
  styles: ``,
})
export class SubprogramCard {
  icons = {
    moveLeft: ArrowLeft,
    fileText: FileText,
    notepadText: NotepadText,
    userPlus: UserPlus,
    tag: Tags,
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

  project = input.required<IProject>();

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

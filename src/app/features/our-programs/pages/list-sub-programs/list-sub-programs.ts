import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ArrowLeft,
  Calendar1,
  CalendarCheck,
  CalendarMinus,
  FileText,
  FolderOpenDot,
  LucideAngularModule,
  MapPin,
  MessageCircleMore,
  MoveRight,
  NotepadText,
  Tag,
  ThumbsUp,
  UserPlus,
  MoveUpRight,
  ArrowRight,
} from 'lucide-angular';
import { SubprogramCard } from '../component/subprogram-card/subprogram-card';
import { CommonModule } from '@angular/common';
import { SubprogramsStore } from '../../../landing/store/subprogram.store';
import { IProject } from '../../../../shared/models/entities.models';
import { carouselConfig } from '../../../landing/config/carousel.config';
import { CarouselModule } from 'primeng/carousel';
import { SubprogramCardEventSkeleton } from '../component/subprogram-card-event-skeleton copy/subprogram-card-skeleton';

@Component({
  selector: 'app-list-sub-programs',
  providers: [SubprogramsStore],
  imports: [
    LucideAngularModule,
    CommonModule,
    CommonModule,
    CarouselModule,
    SubprogramCardEventSkeleton,
    SubprogramCard,
  ],
  templateUrl: './list-sub-programs.html',
  styles: ``,
})
export class ListSubPrograms implements OnInit {
  icons = {
    moveLeft: ArrowLeft,
    fileText: FileText,
    notepadText: NotepadText,
    userPlus: UserPlus,
    tag: Tag,
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
    moveRight: ArrowRight,
  };

  #route = inject(ActivatedRoute);
  store = inject(SubprogramsStore);
  carouselOptions = carouselConfig;

  ngOnInit(): void {
    const slug = this.#route.snapshot.params['slug'];
    this.store.loadSubprogram(slug);
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

import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ArrowLeft,
  FolderOpenDot,
  LucideAngularModule,
  MoveRight,
  ThumbsUp,
  UserPlus,
  MoveUpRight,
  ArrowRight
} from 'lucide-angular';
import { SubprogramCard } from '../../component/subprogram-card/subprogram-card';
import { CommonModule } from '@angular/common';
import { SubprogramsStore } from '../../../landing/store/subprogram.store';
import { IProject } from '../../../../shared/models/entities.models';
import { CarouselModule } from 'primeng/carousel';
import { SubprogramCardSkeleton } from '../../component/subprogram-card-skeleton/subprogram-card-skeleton';
import { SubprogramEventCard } from '../../component/subprogram-event-card/subprogram-event-card';

@Component({
  selector: 'app-list-sub-programs',
  providers: [SubprogramsStore],
  imports: [
    LucideAngularModule,
    CommonModule,
    CommonModule,
    CarouselModule,
    SubprogramCard,
    SubprogramCardSkeleton,
    SubprogramEventCard
  ],
  templateUrl: './list-sub-programs.html',
  styles: ``
})
export class ListSubPrograms implements OnInit {
  icons = {
    moveLeft: ArrowLeft,
    userPlus: UserPlus,
    moveUp: MoveUpRight,
    thumbsUp: ThumbsUp,
    program: FolderOpenDot,
    arrow: MoveRight,
    moveRight: ArrowRight
  };

  #route = inject(ActivatedRoute);
  store = inject(SubprogramsStore);
  carouselOptions = [
    {
      breakpoint: '1280px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '991px',
      numVisible: 1,
      numScroll: 1
    },
    {
      breakpoint: '575px',
      numVisible: 1,
      numScroll: 1
    }
  ];

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

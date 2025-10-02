import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  ArrowLeft,
  Calendar1,
  FileText,
  FolderOpenDot,
  LucideAngularModule,
  MessageCircleMore,
  MoveRight,
  MoveUpRight,
  NotepadText,
  Tag,
  ThumbsUp,
  UserPlus,
} from 'lucide-angular';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ProgramStore } from '../../../landing/store/program.store';
import { SubprogramCardSkeleton } from '../../component/subprogram-card-skeleton/subprogram-card-skeleton';
import { Subject, takeUntil } from 'rxjs';
import { Button } from 'primeng/button';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-detail-programs',
  providers: [ProgramStore],
  imports: [
    LucideAngularModule,
    CommonModule,
    RouterLink,
    SubprogramCardSkeleton,
    Button,
    ApiImgPipe,
    NgOptimizedImage,
  ],
  templateUrl: './detail-programs.html',
})
export class DetailPrograms implements OnInit, OnDestroy {
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
  };
  #route = inject(ActivatedRoute);
  store = inject(ProgramStore);
  destroy$ = new Subject<void>();

  ngOnInit(): void {
    this.#route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const slug = params.get('slug');
      if (slug) this.store.loadProgram(slug);
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

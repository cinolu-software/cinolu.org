import { Component, inject, OnInit } from '@angular/core';
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
import { CommonModule } from '@angular/common';
import { ProgramStore } from '../../../landing/store/program.store';
import { SubprogramCardSkeleton } from '../../component/subprogram-card-skeleton/subprogram-card-skeleton';

@Component({
  selector: 'app-detail-programs',
  providers: [ProgramStore],
  imports: [
    LucideAngularModule,
    CommonModule,
    RouterLink,
    SubprogramCardSkeleton,
  ],
  templateUrl: './detail-programs.html',
  styles: ``,
})
export class DetailPrograms implements OnInit {
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

  ngOnInit(): void {
    const slug = this.#route.snapshot.params['slug'];
    this.store.loadProgram(slug);
  }
}

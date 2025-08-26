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
import { SubprogramsStore } from '../../../landing/store/subprogram.store';

@Component({
  selector: 'app-list-sub-programs',
  providers: [SubprogramsStore],
  imports: [LucideAngularModule, CommonModule, RouterLink],
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
  };

  #route = inject(ActivatedRoute);
  store = inject(SubprogramsStore);

  ngOnInit(): void {
    const slug = this.#route.snapshot.params['slug'];
    this.store.loadSubprogram(slug);
  }
}

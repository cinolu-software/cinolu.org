import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ArrowLeft,
  Calendar1,
  FileText,
  FolderOpenDot,
  LucideAngularModule,
  MessageCircleMore,
  MoveUpRight,
  NotepadText,
  Tag,
  ThumbsUp,
  UserPlus,
} from 'lucide-angular';
import { CommonModule, Location } from '@angular/common';
import { ProgramStore } from '../../../landing/store/program.store';

@Component({
  selector: 'app-detail-programs',
  providers: [ProgramStore],
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './detail-programs.html',
  styles: ``,
})
export class DetailPrograms implements OnInit {
  #location = inject(Location);
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
    program:FolderOpenDot
  };
  #route = inject(ActivatedRoute);
  store = inject(ProgramStore);

  ngOnInit(): void {
    const slug = this.#route.snapshot.params['slug'];
    this.store.loadProgram(slug);
  }

  onGoBack(): void {
    this.#location.back();
  }
}

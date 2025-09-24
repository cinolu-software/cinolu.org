import { Component, inject, input } from '@angular/core';
import {
  Calendar1,
  Info,
  LucideAngularModule,
  MessageCircleMore,
  MoveUpRight,
  Tag,
  ThumbsUp,
  UserPlus,
} from 'lucide-angular';
import { IArticle } from '../../../../shared/models/entities.models';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { RouterLink } from '@angular/router';
import { CommentsStore } from '../../store/comments/comments.store';
@Component({
  selector: 'app-article-card',
  imports: [
    LucideAngularModule,
    NgOptimizedImage,
    ApiImgPipe,
    RouterLink,
    CommonModule,
  ],
  providers: [CommentsStore],
  templateUrl: './article-card.html',
})
export class ArticleCard {
  article = input.required<IArticle>();
  commentStore = inject(CommentsStore);
  icons = {
    info: Info,
    userPlus: UserPlus,
    tag: Tag,
    comment: MessageCircleMore,
    like: ThumbsUp,
    calendar: Calendar1,
    moveUp: MoveUpRight,
  };
  protected readonly ApiImgPipe = ApiImgPipe;

  get commentCount() {
    return (comments: unknown) =>
      Array.isArray(comments) ? comments.length : 0;
  }
}

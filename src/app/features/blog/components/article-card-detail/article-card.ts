import { Component, input } from '@angular/core';
import {
  Calendar1,
  Info,
  LucideAngularModule,
  MessageCircleMore,
  MoveUpRight,
  Tag,
  ThumbsUp,
  UserPlus
} from 'lucide-angular';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import { IArticle } from '@common/models';
import { ApiImgPipe } from '@common/pipes';

@Component({
  selector: 'app-article-card',
  imports: [LucideAngularModule, NgOptimizedImage, ApiImgPipe, RouterLink, CommonModule],
  templateUrl: './article-card.html'
})
export class ArticleCardDetail {
  article = input.required<IArticle>();
  icons = {
    info: Info,
    userPlus: UserPlus,
    tag: Tag,
    comment: MessageCircleMore,
    like: ThumbsUp,
    calendar: Calendar1,
    moveUp: MoveUpRight
  };
  protected ApiImgPipe = ApiImgPipe;
}

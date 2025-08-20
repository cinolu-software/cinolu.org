import { Component, input } from '@angular/core';
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

@Component({
  selector: 'app-article-card',
  imports: [
    LucideAngularModule,
    NgOptimizedImage,
    ApiImgPipe,
    RouterLink,
    CommonModule,
  ],
  templateUrl: './article-card.html',
})
export class ArticleCard {
  article = input.required<IArticle>();
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
}

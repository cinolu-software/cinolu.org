import { Component, input } from '@angular/core';
import {
  Calendar1,
  Info,
  LucideAngularModule,
  MessageCircleMore,
  Tag,
  ThumbsUp,
  UserPlus,
} from 'lucide-angular';
import { IArticle } from '../../../../../shared/models/entities.models';
import { NgOptimizedImage } from '@angular/common';
import { ApiImgPipe } from '../../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-article-card',
  imports: [LucideAngularModule, NgOptimizedImage, ApiImgPipe],
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
  };
  protected readonly ApiImgPipe = ApiImgPipe;
}

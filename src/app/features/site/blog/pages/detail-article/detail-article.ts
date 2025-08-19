import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ArrowLeft,
  Calendar1,
  FileText,
  LucideAngularModule,
  MessageCircleMore,
  MoveUpRight,
  NotepadText,
  Tag,
  ThumbsUp,
  UserPlus,
} from 'lucide-angular';
import { ArticleStore } from '../../../../dashboard/staff/blog/store/articles/article.store';
import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { ApiImgPipe } from '../../../../../shared/pipes/api-img.pipe';
import { ArticleCardSkeleton } from '../../components/article-card-skeleton/article-card-skeleton';
import { HeroBlog } from "../../components/hero-blog/hero-blog";

@Component({
  selector: 'app-detail-article',
  providers: [ArticleStore],
  imports: [
    LucideAngularModule,
    CommonModule,
    ApiImgPipe,
    ArticleCardSkeleton,
    NgOptimizedImage,
    HeroBlog
],
  templateUrl: './detail-article.html',
  styles: ``,
})
export class DetailArticle implements OnInit {
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
  };
  #route = inject(ActivatedRoute);
  store = inject(ArticleStore);

  ngOnInit(): void {
    const slug = this.#route.snapshot.params['slug'];
    this.store.loadArticle(slug);
  }

  onGoBack(): void {
    this.#location.back();
  }
}

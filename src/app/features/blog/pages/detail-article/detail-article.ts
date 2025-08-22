import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
import { ArticleStore } from '../../../dashboard/staff/blog/store/articles/article.store';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { ArticleCardSkeleton } from '../../components/article-card-skeleton/article-card-skeleton';
import { HeroBlog } from '../../components/hero-blog/hero-blog';
import { RecentArticlesStore } from '../../store/recent-articles.store';

@Component({
  selector: 'app-detail-article',
  providers: [ArticleStore, RecentArticlesStore],
  imports: [
    LucideAngularModule,
    CommonModule,
    ApiImgPipe,
    ArticleCardSkeleton,
    NgOptimizedImage,
    HeroBlog,
    RouterLink,
  ],
  templateUrl: './detail-article.html',
  styles: ``,
})
export class DetailArticle implements OnInit {
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
  storeArticle = inject(RecentArticlesStore);

  ngOnInit(): void {
    this.#route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.store.loadArticle(slug);
      }
    });
  }
}

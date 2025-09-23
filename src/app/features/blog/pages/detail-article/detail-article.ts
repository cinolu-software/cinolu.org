import { Component, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {
  ArrowLeft,
  Calendar1,
  Edit2Icon,
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
import { RecentArticlesStore } from '../../store/recent-articles.store';
import { HeroCard } from '../../../../layout/components/hero-card/hero-card';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { AddCommentStore } from '../../../dashboard/staff/blog/store/comments/add-comment.store';
import { Button } from 'primeng/button';
import { CommentStore } from '../../../dashboard/staff/blog/store/comments/comment.store';

@Component({
  selector: 'app-detail-article',
  providers: [ArticleStore, RecentArticlesStore, AddCommentStore, CommentStore],
  imports: [
    LucideAngularModule,
    CommonModule,
    ApiImgPipe,
    ArticleCardSkeleton,
    NgOptimizedImage,
    RouterLink,
    HeroCard,
    ReactiveFormsModule,
    TextareaModule,
    Button,
  ],
  templateUrl: './detail-article.html',
})
export class DetailArticle implements OnInit {
  #fb = inject(FormBuilder);
  form: FormGroup;
  storeAddComment = inject(AddCommentStore);
  storeComment = inject(CommentStore);
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
    info: Edit2Icon,
  };
  #route = inject(ActivatedRoute);
  store = inject(ArticleStore);
  storeArticle = inject(RecentArticlesStore);

  constructor() {
    this.form = this.#fb.group({
      content: ['', Validators.required],
      articleId: [''],
    });
  }

  articleEffect = effect(() => {
    const article = this.store.article();
    if (article) {
      this.form.patchValue({ articleId: article.id });
      this.storeComment.loadComments(article.id);
    }
  });

  ngOnInit(): void {
    this.#route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      if (slug) {
        this.store.loadArticle(slug);
        const article = this.store.article();
        if (article) this.storeComment.loadComments(article.id);
      }
    });
  }

  onAddComment(): void {
    const article = this.store.article();
    if (!article) return;
    this.form.patchValue({ articleId: article.id });
    if (!this.form.valid) return;
    this.storeAddComment.addComment(this.form.value);
    this.form.reset();
    this.storeComment.loadComments(article.id);
  }

  get commentCount(): number {
    const comments = this.store.article()?.comments;
    return Array.isArray(comments) ? comments.length : 0;
  }

  get commentsAllWithName() {
    return this.storeComment.comments()?.filter((c) => !!c.author?.name) ?? [];
  }
}

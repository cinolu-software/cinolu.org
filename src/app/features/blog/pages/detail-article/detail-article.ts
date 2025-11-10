import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ConfirmDialog } from 'primeng/confirmdialog';
import {
  ArrowLeft,
  BadgeInfo,
  Calendar1,
  FileText,
  LucideAngularModule,
  MessageCircleMore,
  MoveUpRight,
  NotepadText,
  Pencil,
  Tags,
  ThumbsUp,
  Trash,
  UserPlus
} from 'lucide-angular';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { ArticleCardSkeleton } from '../../components/article-card-skeleton/article-card-skeleton';
import { RecentArticlesStore } from '../../store/articles/recent-articles.store';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { AddCommentStore } from '../../store/comments/add-comment.store';
import { Button } from 'primeng/button';
import { AuthStore } from '../../../../core/auth/auth.store';
import { UpdateCommentStore } from '../../store/comments/update-comment.store';
import { IComment } from '../../../../shared/models/entities.models';
import { Dialog } from 'primeng/dialog';
import { DeleteCommentStore } from '../../store/comments/delete-comment';
import { ConfirmationService } from 'primeng/api';
import { CommentsStore } from '../../store/comments/comments.store';
import { Subject, takeUntil } from 'rxjs';
import { QuillViewComponent } from 'ngx-quill';
import { GalleriaModule } from 'primeng/galleria';
import { carouselConfig } from '../../../landing/config/carousel.config';
import { ArticleStore } from '@features/blog/store/articles/article.store';
import { AnalyticsService } from '../../../../core/services/analytics/analytics.service';

@Component({
  selector: 'app-detail-article',
  providers: [
    CommentsStore,
    ArticleStore,
    UpdateCommentStore,
    RecentArticlesStore,
    AddCommentStore,
    DeleteCommentStore,
    ConfirmationService
  ],
  imports: [
    LucideAngularModule,
    CommonModule,
    ApiImgPipe,
    ArticleCardSkeleton,
    NgOptimizedImage,
    RouterLink,
    ReactiveFormsModule,
    TextareaModule,
    Button,
    Dialog,
    ConfirmDialog,
    QuillViewComponent,
    GalleriaModule
  ],
  templateUrl: './detail-article.html'
})
export class DetailArticle implements OnInit, OnDestroy {
  #fb = inject(FormBuilder);
  form: FormGroup;
  storeAddComment = inject(AddCommentStore);
  #confirmationService = inject(ConfirmationService);
  profile = inject(AuthStore);
  updateCommentStore = inject(UpdateCommentStore);
  deleteCommentStore = inject(DeleteCommentStore);
  commentsStore = inject(CommentsStore);
  store = inject(ArticleStore);
  storeArticle = inject(RecentArticlesStore);
  #route = inject(ActivatedRoute);
  responsiveOptions = carouselConfig;
  updateCommentForm: FormGroup;
  icons = {
    moveLeft: ArrowLeft,
    fileText: FileText,
    notepadText: NotepadText,
    userPlus: UserPlus,
    tag: Tags,
    comment: MessageCircleMore,
    like: ThumbsUp,
    calendar: Calendar1,
    moveUp: MoveUpRight,
    info: BadgeInfo,
    edit: Pencil,
    delete: Trash
  };
  queryParams = signal({
    page: this.#route.snapshot.params['page'] || '1'
  });
  #slug = this.#route.snapshot.params['slug'];
  comment = signal<IComment | null>(null);
  showEditModal = signal(false);
  destroy$ = new Subject<void>();
  isLoggedIn = signal<boolean>(false);
  #analytics = inject(AnalyticsService);
  #articleOpenTime = performance.now();

  ngOnDestroy() {
    // Send final read event if still on article
    const article = this.store.article();
    if (article) {
      const timeSpent = performance.now() - this.#articleOpenTime;
      this.#analytics.trackBlogArticleRead({
        slug: article.slug,
        time_spent_ms: Math.round(timeSpent)
      });
    }
    this.destroy$.next();
    this.destroy$.complete();
  }

  constructor() {
    this.form = this.#fb.group({
      content: ['', Validators.required],
      articleId: ['']
    });

    this.updateCommentForm = this.#fb.group({
      id: ['', Validators.required],
      content: ['', Validators.required]
    });
    effect(() => {
      this.isLoggedIn.set(!!this.profile.user());
      if (!this.isLoggedIn()) this.form.get('content')?.disable();
      this.commentsStore.loadComments({
        slug: this.#slug,
        dto: this.queryParams()
      });
    });
  }

  loadMore(): void {
    this.queryParams.update((params) => ({
      ...params,
      page: +params.page + 1
    }));
  }

  ngOnInit(): void {
    this.#route.paramMap.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const slug = params.get('slug');
      if (slug) this.store.loadArticle(slug);
    });
    // Track article open when data arrives
    effect(() => {
      const a = this.store.article();
      if (a) {
        this.#articleOpenTime = performance.now();
        this.#analytics.trackBlogArticleOpen(a.slug);
      }
    });
  }

  onAddComment(): void {
    const article = this.store.article();
    if (!article || !this.form.valid) return;
    this.form.patchValue({ articleId: article.id });
    this.storeAddComment.addComment(this.form.value);
    this.form.reset();
  }

  onToggleEditModal(comment: IComment | null): void {
    this.comment.set(comment);
    this.updateCommentForm.patchValue({
      id: comment?.id || '',
      content: comment?.content || ''
    });
    this.showEditModal.set(true);
  }

  closeModal(): void {
    this.showEditModal.set(false);
  }

  onUpdateComment(): void {
    this.updateCommentStore.updateComment({
      payload: this.updateCommentForm.value,
      onSuccess: () => {
        this.showEditModal.set(false);
      }
    });
  }

  onDeleteComment(commentId: string, event: Event): void {
    this.#confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Êtes-vous sûr ?',
      acceptLabel: 'Confirmer',
      rejectLabel: 'Annuler',
      closable: false,
      acceptButtonProps: {
        severity: 'danger',
        outlined: true,
        size: 'small'
      },
      rejectButtonProps: {
        severity: 'secondary',
        outlined: true,
        size: 'small'
      },
      accept: () => {
        this.deleteCommentStore.deleteComment({ id: commentId });
      }
    });
  }
}

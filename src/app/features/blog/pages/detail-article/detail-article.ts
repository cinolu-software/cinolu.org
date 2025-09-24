import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
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
  Tag,
  ThumbsUp,
  Trash,
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
import { AuthStore } from '../../../../core/auth/auth.store';
import { UpdateCommentStore } from '../../../dashboard/staff/blog/store/comments/update-comment.store';
import { IComment } from '../../../../shared/models/entities.models';
import { Dialog } from 'primeng/dialog';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { DeleteCommentStore } from '../../../dashboard/staff/blog/store/comments/delete-comment';
import { ConfirmationService } from 'primeng/api';
@Component({
  selector: 'app-detail-article',
  providers: [
    ArticleStore,
    UpdateCommentStore,
    RecentArticlesStore,
    AddCommentStore,
    CommentStore,
    DeleteCommentStore,
    ConfirmationService,
  ],
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
    Dialog,
    ConfirmPopup,
  ],
  templateUrl: './detail-article.html',
})
export class DetailArticle implements OnInit {
  #fb = inject(FormBuilder);
  form: FormGroup;
  storeAddComment = inject(AddCommentStore);
  #confirmationService = inject(ConfirmationService);
  storeComment = inject(CommentStore);
  profile = inject(AuthStore);
  updateCommentStore = inject(UpdateCommentStore);
  deleteCommentStore = inject(DeleteCommentStore);
  updateCommentForm: FormGroup;

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
    info: BadgeInfo,
    edit: Pencil,
    delete: Trash,
  };
  #route = inject(ActivatedRoute);
  store = inject(ArticleStore);
  storeArticle = inject(RecentArticlesStore);
  comment = signal<IComment | null>(null);
  showEditModal = signal(false);

  constructor() {
    this.form = this.#fb.group({
      content: ['', Validators.required],
      articleId: [''],
    });

    this.updateCommentForm = this.#fb.group({
      id: ['', Validators.required],
      content: ['', Validators.required],
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

  onToggleEditModal(comment: IComment | null): void {
    this.comment.set(comment);
    this.updateCommentForm.patchValue({
      id: comment?.id || '',
      content: comment?.content || '',
    });
    this.showEditModal.update((v) => !v);
  }

  onUpdateComment(): void {
    this.updateCommentStore.updateComment({
      payload: this.updateCommentForm.value,
      onSuccess: () => {
        this.onToggleEditModal(null);
        this.updateCommentForm.reset();
      },
    });
  }

  onDeleteComment(commentId: string, event: Event): void {
    this.#confirmationService.confirm({
      target: event.target as HTMLElement,
      message: 'Êtes-vous sûr ?',
      acceptLabel: 'Confirmer',
      rejectLabel: 'Annuler',
      acceptButtonProps: {
        severity: 'danger',
      },
      rejectButtonProps: {
        severity: 'secondary',
        outlined: true,
      },
      accept: () => {
        this.deleteCommentStore.deleteComment({ id: commentId });
      },
    });
  }
}

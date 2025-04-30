import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, DestroyRef, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'app/blog/data-access/posts.service';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { IComment, IPost, IUser } from 'app/shared/utils/types/models.type';
import { Observable, Subscription } from 'rxjs';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { NgIcon } from '@ng-icons/core';
import { Store } from '@ngrx/store';
import { selectUser } from 'app/shared/store/auth/auth.reducers';
import { Textarea } from 'primeng/textarea';
import { Button } from 'primeng/button';
import { PostSkeletonComponent } from '../../ui/post-skeleton/post-skeleton.component';
import { ShortNumberPipe } from '../../../shared/pipes/short-number.pipe';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-post',
  providers: [PostsService, ConfirmationService],
  imports: [
    CommonModule,
    ApiImgPipe,
    Textarea,
    Button,
    NgOptimizedImage,
    NgIcon,
    InputTextModule,
    PostSkeletonComponent,
    ShortNumberPipe,
    ReactiveFormsModule,
    ConfirmPopupModule,
    DialogModule
  ],
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit, OnDestroy {
  post$: Observable<IAPIResponse<IPost>>;
  comments$: Observable<IAPIResponse<[IComment[], number]>>;
  comment$: Observable<IAPIResponse<IComment>>;
  user$: Observable<IUser>;
  #fb = inject(FormBuilder);
  #route = inject(ActivatedRoute);
  #store = inject(Store);
  #postsService = inject(PostsService);
  #slug = this.#route.snapshot.paramMap.get('slug');
  #confirmationService = inject(ConfirmationService);
  #subscription = new Subscription();
  isLoadingMore = signal(false);
  isUpdating = signal(false);
  isCommenting = signal(false);
  isDeleting = signal(false);
  modalIsOpen = signal(false);
  page = signal(1);
  comments = signal<[IComment[], number]>([[], 0]);
  form: FormGroup;
  editForm: FormGroup;

  constructor(destroyRef: DestroyRef) {
    this.form = this.#fb.group({
      content: ['', [Validators.required, Validators.minLength(5)]]
    });
    this.editForm = this.#fb.group({
      content: ['', [Validators.required, Validators.minLength(5)]]
    });
    effect(() => {
      this.isLoadingMore.set(true);
      this.#postsService
        .getComments(this.#slug, { page: this.page() })
        .pipe(takeUntilDestroyed(destroyRef))
        .subscribe({
          next: (res) => {
            if (!res?.data) return;
            this.comments.update((prev) => [[...prev[0], ...res.data[0]], res.data[1]]);
            this.isLoadingMore.set(false);
          },
          error: () => {
            this.isLoadingMore.set(false);
          }
        });
    });
  }

  ngOnInit(): void {
    this.user$ = this.#store.select(selectUser);
    this.#subscription = this.#postsService.viewPost(this.#slug).subscribe();
    this.post$ = this.#postsService.getPost(this.#slug);
  }

  closeModal(): void {
    this.modalIsOpen.set(false);
  }

  openModal(content: string): void {
    this.modalIsOpen.set(true);
    this.editForm = this.#fb.group({
      content: [content, [Validators.required, Validators.minLength(5)]]
    });
  }

  onUpdateComment(id: string): void {
    this.isUpdating.set(true);
    const dto = { content: this.editForm.value.content };
    this.#subscription = this.#postsService.updateComment(id, dto).subscribe({
      next: (res) => {
        if (!res?.data) return;
        this.comments.update((prev) => {
          const [commentList, other] = prev;
          const updatedList = commentList
            .map((comment) => (comment.id === id ? res.data : comment))
            .filter((comment) => comment.id !== id);
          return [[res.data, ...updatedList], other];
        });
        this.modalIsOpen.set(false);
        this.isUpdating.set(false);
      },
      error: () => {
        this.isUpdating.set(false);
      }
    });
  }

  estimateReadingTime(words: string): string {
    const minutes = Math.ceil(words.trim().split(/\s+/).length / 200);
    return `${minutes} Min`;
  }

  onComment(post: string): void {
    this.isCommenting.set(true);
    const comment = { post, content: this.form.value.content };
    this.#subscription = this.#postsService.commentPost(comment).subscribe({
      next: (res) => {
        if (!res?.data) return;
        this.comments.update((prev) => {
          return [[res.data, ...prev[0]], prev[1]];
        });
        this.form.reset();
        this.isCommenting.set(false);
      },
      error: () => {
        this.isCommenting.set(false);
      }
    });
  }

  deleteComment(id: string): void {
    this.isDeleting.set(true);
    this.#subscription = this.#postsService.deleteComment(id).subscribe({
      next: () => {
        this.comments.update((prev) => [prev[0].filter((comment) => comment.id !== id), prev[1]]);
        this.isDeleting.set(false);
      },
      error: () => {
        this.isCommenting.set(false);
      }
    });
  }

  loadMoreComments(): void {
    this.page.update((prev) => ++prev);
  }

  confirmDelete(event: Event, id: string): void {
    this.#confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Voulez-vous vraiment supprimer ce commentaire ?',
      header: 'Confirmation',
      rejectButtonProps: {
        label: 'Annuler',
        severity: 'secondary'
      },
      acceptButtonProps: {
        label: 'Supprimer',
        severity: 'danger'
      },
      accept: () => {
        this.deleteComment(id);
      }
    });
  }

  ngOnDestroy(): void {
    this.#subscription?.unsubscribe();
  }
}

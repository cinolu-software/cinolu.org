import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from 'app/blog/data-access/posts.service';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { IComment, IPost, IUser } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { NgIcon } from '@ng-icons/core';
import { Store } from '@ngrx/store';
import { selectUser } from 'app/shared/store/auth/auth.reducers';
import { Textarea } from 'primeng/textarea';
import { Button } from 'primeng/button';
import { PostSkeletonComponent } from '../../ui/post-skeleton/post-skeleton.component';
import { ShortNumberPipe } from '../../../shared/pipes/short-number.pipe';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';

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
    PostSkeletonComponent,
    ShortNumberPipe,
    ReactiveFormsModule,
    ConfirmPopupModule
  ],
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {
  post$: Observable<IAPIResponse<IPost>>;
  comments$: Observable<IAPIResponse<IComment[]>>;
  comment$: Observable<IAPIResponse<IComment>>;
  user$: Observable<IUser>;
  fb = inject(FormBuilder);
  form: FormGroup;
  #route = inject(ActivatedRoute);
  #store = inject(Store);
  #postsService = inject(PostsService);
  #slug = this.#route.snapshot.paramMap.get('slug');
  #confirmationService = inject(ConfirmationService);

  constructor() {
    this.form = this.fb.group({
      content: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.user$ = this.#store.select(selectUser);
    this.#postsService.viewPost(this.#slug);
    this.comments$ = this.#postsService.getComments(this.#slug);
    this.post$ = this.#postsService.getPost(this.#slug);
  }

  estimateReadingTime(words: string): string {
    const minutes = Math.ceil(words.trim().split(/\s+/).length / 200);
    return `${minutes} Min`;
  }

  onComment(post: string): void {
    if (this.form.invalid) return;
    const comment = {
      post,
      content: this.form.value.content
    };
    this.comment$ = this.#postsService.commentPost(comment);
  }

  deleteComment(id: string): void {
    this.#postsService.deleteComment(id);
  }

  confirmDelete(event: Event, id: string): void {
    this.#confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Voulez-vous vraiment supprimer ce commentaire ?',
      header: 'Confirmation',
      icon: 'pi pi-info-circle',
      rejectButtonProps: {
        label: 'Annuler',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Supprimer',
        icon: 'pi pi-check',
        severity: 'danger'
      },
      accept: () => {
        this.deleteComment(id);
      }
    });
  }
}

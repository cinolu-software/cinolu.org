import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, effect, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'app/blog/data-access/blog.service';
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

@Component({
  selector: 'app-post',
  providers: [BlogService],
  imports: [
    CommonModule,
    ApiImgPipe,
    Textarea,
    Button,
    NgOptimizedImage,
    NgIcon,
    PostSkeletonComponent,
    ShortNumberPipe
  ],
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit, OnDestroy {
  post$: Observable<IAPIResponse<IPost>>;
  comments$: Observable<IAPIResponse<[IComment[], number]>>;
  loadMore = signal<boolean>(false);
  user$: Observable<IUser>;
  #route = inject(ActivatedRoute);
  #store = inject(Store);
  #blogService = inject(BlogService);
  #slug = this.#route.snapshot.paramMap.get('slug');
  #subscription: Subscription;

  constructor() {
    this.user$ = this.#store.select(selectUser);
    effect(() => {
      this.comments$ = this.#blogService.getComments(this.#slug, this.loadMore());
    });
  }

  ngOnInit(): void {
    this.#subscription = this.#blogService.viewPost(this.#slug).subscribe();
    this.post$ = this.#blogService.getPost(this.#slug);
  }

  estimateReadingTime(words: string): string {
    const minutes = Math.ceil(words.trim().split(/\s+/).length / 200);
    return `${minutes} Min`;
  }

  loadMoreComments(): void {
    this.loadMore.set(true);
  }

  ngOnDestroy(): void {
    this.#subscription?.unsubscribe();
  }
}

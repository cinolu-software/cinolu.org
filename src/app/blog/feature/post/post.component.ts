import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'app/blog/data-access/blog.service';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { IComment, IPost, IUser } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { NgIcon } from '@ng-icons/core';
import { Store } from '@ngrx/store';
import { selectUser } from 'app/shared/store/auth/auth.reducers';
// import { Textarea } from 'primeng/textarea';
// import { Button } from 'primeng/button';

@Component({
  selector: 'app-post',
  providers: [BlogService],
  imports: [CommonModule, ApiImgPipe, NgOptimizedImage, NgIcon],
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {
  post$: Observable<IAPIResponse<IPost>>;
  comments$: Observable<IAPIResponse<[IComment[], number]>>;
  #route = inject(ActivatedRoute);
  user$: Observable<IUser>;
  #store = inject(Store);
  #blogService = inject(BlogService);

  constructor() {
    this.user$ = this.#store.select(selectUser);
  }

  ngOnInit(): void {
    const slug = this.#route.snapshot.paramMap.get('slug');
    this.post$ = this.#blogService.getPost(slug);
    this.comments$ = this.#blogService.getComments(slug);
  }
}

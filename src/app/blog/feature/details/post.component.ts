import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IPost } from 'app/shared/utils/types/models.type';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ApiImgPipe } from 'app/shared/pipes/api-img.pipe';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { PostSkeletonComponent } from '../../ui/post-skeleton/post-skeleton.component';
import { BlogService } from '../../data-access/blog.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-post',
  providers: [BlogService],
  imports: [CommonModule, MatIconModule, PostSkeletonComponent, MatButtonModule, NgOptimizedImage, ApiImgPipe],
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {
  post$: Observable<IAPIResponse<IPost>>;
  #blogService = inject(BlogService);
  #activatedRoute = inject(ActivatedRoute);
  #location = inject(Location);

  ngOnInit(): void {
    const id = this.#activatedRoute.snapshot.paramMap.get('id');
    this.post$ = this.#blogService.getPost(id);
  }

  back(): void {
    this.#location.back();
  }
}

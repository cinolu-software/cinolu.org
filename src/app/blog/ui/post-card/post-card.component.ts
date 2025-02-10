import { Component, input } from '@angular/core';
import { IPost } from '../../../shared/utils/types/models.type';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-post-card',
  imports: [NgOptimizedImage, ApiImgPipe, CommonModule, RouterLink],
  templateUrl: './post-card.component.html'
})
export class PostCardComponent {
  post = input<IPost>();
}

import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { ShortNumberPipe } from 'app/shared/pipes/short-number.pipe';
import { IPost } from 'app/shared/utils/types/models.type';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-post-card',
  imports: [NgOptimizedImage, NgIcon, RouterLink, ShortNumberPipe, ApiImgPipe],
  templateUrl: './post-card.component.html'
})
export class PostCardComponent {
  post = input<IPost>();

  estimateReadingTime(words: string): string {
    const minutes = Math.ceil(words.trim().split(/\s+/).length / 200);
    return `${minutes} Min`;
  }
}

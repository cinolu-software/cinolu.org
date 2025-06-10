import { NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { ShortNumberPipe } from '../../../shared/pipes/short-number.pipe';
import { IPost } from '../../../shared/utils/types/models.type';
import { LucideAngularModule, Eye, MessageSquare } from 'lucide-angular';

@Component({
  selector: 'app-post-card',
  imports: [NgOptimizedImage, LucideAngularModule, RouterLink, ShortNumberPipe, ApiImgPipe],
  templateUrl: './post-card.component.html',
})
export class PostCardComponent {
  post = input.required<IPost>();
  icons = {
    eye: Eye,
    messageSquare: MessageSquare,
  };

  estimateReadingTime(words: string): string {
    const minutes = Math.ceil(words.trim().split(/\s+/).length / 200);
    return `${minutes} Min`;
  }
}

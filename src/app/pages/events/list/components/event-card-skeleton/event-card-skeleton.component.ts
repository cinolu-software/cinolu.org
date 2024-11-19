import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-event-card-skeleton',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './event-card-skeleton.component.html'
})
export class EventCardSkeletonComponent {}

import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-team-card-skeleton',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './team-card-skeleton.component.html'
})
export class TeamCardSkeletonComponent {}

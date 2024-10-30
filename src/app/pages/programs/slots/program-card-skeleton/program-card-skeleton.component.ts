import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-program-card-skeleton',
  standalone: true,
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './program-card-skeleton.component.html'
})
export class ProgramCardSkeletonComponent {}

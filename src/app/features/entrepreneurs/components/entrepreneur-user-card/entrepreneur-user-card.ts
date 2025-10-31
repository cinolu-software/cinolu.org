import { Component, input } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Award, LucideAngularModule, MoveRight, Star } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';
import { IVenture } from '../../../../shared/models';
import { ApiImgPipe } from '../../../../shared/pipes';

@Component({
  selector: 'app-entrepreneur-user-card',
  imports: [CommonModule, LucideAngularModule, ApiImgPipe, NgOptimizedImage, RouterLink, Button],
  templateUrl: './entrepreneur-user-card.html'
})
export class EntrepreneurUserCard {
  entrepreneurs = input.required<IVenture>();

  icons = {
    award: Award,
    verified: Star,
    moveRight: MoveRight
  };
}

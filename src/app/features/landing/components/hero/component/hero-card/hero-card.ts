import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, MoveRight, HandCoins } from 'lucide-angular';
import { IHeroSlide } from '../../../../data/hero-slides.data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-card',
  imports: [LucideAngularModule, RouterLink, CommonModule],
  templateUrl: './hero-card.html',
  standalone: true
})
export class HeroCard {
  @Input({ required: true }) slide!: IHeroSlide;

  icons = {
    arrowFlash: MoveRight,
    donate: HandCoins
  };
}

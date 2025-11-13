import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, MoveRight, HandCoins } from 'lucide-angular';
import { IHeroSlide } from '../../../../data/hero-slides.data';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero-card',
  imports: [LucideAngularModule, RouterLink, CommonModule, TranslateModule],
  templateUrl: './hero-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroCard {
  slide = input.required<IHeroSlide>();

  icons = {
    arrowFlash: MoveRight,
    donate: HandCoins
  };
}

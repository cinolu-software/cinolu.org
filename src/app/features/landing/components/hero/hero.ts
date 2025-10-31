import { Component } from '@angular/core';
import { STATS } from '../../data/stats.data';
import { HERO_SLIDES } from '../../data/hero-slides.data';
import { LucideAngularModule } from 'lucide-angular';
import { HeroCard } from './component/hero-card/hero-card';
import { CommonModule } from '@angular/common';
import { CarouselModule, CarouselPageEvent } from 'primeng/carousel';
import { carouselConfig } from '@features/landing/config/carousel.config';

@Component({
  selector: 'app-hero',
  imports: [LucideAngularModule, HeroCard, CommonModule, CarouselModule],
  templateUrl: './hero.html'
})
export class Hero {
  stats = STATS;
  slides = HERO_SLIDES;
  currentBgImage = this.slides[0].backgroundImage;

  responsiveOptions = carouselConfig;

  onPageChange(event: CarouselPageEvent): void {
    if (event.page !== undefined) {
      this.currentBgImage = this.slides[event.page].backgroundImage;
    }
  }
}

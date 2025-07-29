import { Component, Inject, PLATFORM_ID, OnInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { STATS } from '../../data/stats.data';
import { LucideAngularModule, Lightbulb, MoveRight, HandCoins } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { titlesItems } from '../../data/title.data';

@Component({
  selector: 'app-hero',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './hero.component.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('700ms ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [animate('700ms ease-in-out', style({ opacity: 0, transform: 'translateY(-10px)' }))])
    ])
  ]
})
export class HeroComponent implements OnInit, OnDestroy {
  stats = STATS;
  icons = {
    lightbulb: Lightbulb,
    arrowFlesh: MoveRight,
    donate: HandCoins
  };

  rotatingTitles = titlesItems;

  currentTitleIndex = 0;
  currentTitle = this.rotatingTitles[0];

  private intervalId: ReturnType<typeof setInterval> | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.intervalId = setInterval(() => {
        this.currentTitleIndex = (this.currentTitleIndex + 1) % this.rotatingTitles.length;
        this.currentTitle = this.rotatingTitles[this.currentTitleIndex];
      }, 4000);
    }
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}

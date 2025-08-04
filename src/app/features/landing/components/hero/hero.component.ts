import { Component, PLATFORM_ID, OnInit, OnDestroy, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { STATS } from '../../data/stats.data';
import { Lightbulb, MoveRight, HandCoins, LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { TITLE_ITEMS } from '../../data/title.data';

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
  #intervalId: ReturnType<typeof setInterval> | undefined;
  #platformId = inject(PLATFORM_ID);
  stats = STATS;
  icons = { lightbulb: Lightbulb, arrowFlash: MoveRight, donate: HandCoins };
  rotatingTitles = TITLE_ITEMS;
  currentTitleIndex = 0;
  currentTitle = this.rotatingTitles[0];

  ngOnInit(): void {
    if (isPlatformBrowser(this.#platformId)) {
      this.#intervalId = setInterval(() => {
        this.currentTitleIndex = (this.currentTitleIndex + 1) % this.rotatingTitles.length;
        this.currentTitle = this.rotatingTitles[this.currentTitleIndex];
      }, 4000);
    }
  }

  ngOnDestroy(): void {
    if (this.#intervalId) clearInterval(this.#intervalId);
  }
}

import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideIconData, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-hero-card',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './hero-card.html',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('1000ms ease-in-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
      transition(':leave', [animate('1000ms ease-in-out', style({ opacity: 0, transform: 'translateY(-10px)' }))]),
    ]),
  ],
})
export class HeroCard {
  @Input({ required: true }) background!: string;
  @Input() badgeIcon!: LucideIconData;
  @Input() badgeText = 'Section';
  @Input({ required: true }) title!: string;
  @Input() highlight?: string;
  @Input() description!: string;
  @Input() overlayColor = 'bg-black/60';
}

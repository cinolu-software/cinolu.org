import { trigger, transition, style, animate } from '@angular/animations';
import { NgClass } from '@angular/common';
import { Component, input, ChangeDetectionStrategy } from '@angular/core';
import { LucideIconData, LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero-card',
  imports: [LucideAngularModule, TranslateModule, NgClass],
  templateUrl: './hero-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(10px)' }),
        animate('1000ms ease-in-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [animate('1000ms ease-in-out', style({ opacity: 0, transform: 'translateY(-10px)' }))])
    ])
  ]
})
export class HeroCard {
  background = input.required<string>();
  badgeIcon = input<LucideIconData>();
  badgeText = input<string>();
  badgeTextKey = input<string>();
  title = input<string>();
  titleKey = input<string>();
  highlight = input<string>();
  highlightKey = input<string>();
  description = input<string>();
  descriptionKey = input<string>();
  overlayColor = input<string>('bg-black/60');
}

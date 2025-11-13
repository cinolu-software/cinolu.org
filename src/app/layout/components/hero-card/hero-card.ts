import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { LucideIconData, LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-hero-card',
  imports: [LucideAngularModule, CommonModule, TranslateModule],
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
  @Input({ required: true }) background!: string;
  @Input() badgeIcon!: LucideIconData;
  @Input() badgeText?: string;
  @Input() badgeTextKey?: string;
  @Input() title?: string;
  @Input() titleKey?: string;
  @Input() highlight?: string;
  @Input() highlightKey?: string;
  @Input() description?: string;
  @Input() descriptionKey?: string;
  @Input() overlayColor = 'bg-black/60';
}

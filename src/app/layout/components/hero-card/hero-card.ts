import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideIconData, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-hero-card',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './hero-card.html',
})
export class HeroCard {
  @Input({ required: true }) background!: string;
  @Input() badgeIcon!: LucideIconData;
  @Input() badgeText = 'Section';
  @Input({ required: true }) title!: string;
  @Input() highlight!: string;
  @Input() description!: string;
  @Input() overlayColor = 'bg-primary-950/85';
  @Input() align: 'top' | 'center' | 'bottom' = 'top';
}

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LucideIconData, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-hero-card',
  imports: [LucideAngularModule, CommonModule],
  templateUrl: './hero-card.html',
})
export class HeroCard {
  @Input() background!: string;
  @Input() badgeIcon!: LucideIconData;
  @Input() badgeText = 'Section';
  @Input() title!: string;
  @Input() highlight!: string;
  @Input() description!: string;
}

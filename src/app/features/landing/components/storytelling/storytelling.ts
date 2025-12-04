import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import {
  LucideAngularModule,
  ArrowRight,
  Quote,
  Sparkles,
  ExternalLink,
  Lightbulb,
  Rocket,
  TrendingUp,
  Star,
  LucideIconData
} from 'lucide-angular';
import { CountUpDirective } from '../../../../shared/directives/count-up.directive';
import { FadeInOnScrollDirective } from '../../../../shared/directives/animations-on-scroll.directive';

interface JourneyStep {
  key: string;
  image: string;
  icon: LucideIconData;
}

interface Stat {
  key: string;
  value: number;
}

@Component({
  selector: 'app-storytelling',
  imports: [LucideAngularModule, CountUpDirective, FadeInOnScrollDirective, TranslateModule],
  templateUrl: './storytelling.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Storytelling {
  icons = {
    arrowRight: ArrowRight,
    quote: Quote,
    sparkles: Sparkles,
    externalLink: ExternalLink,
    star: Star
  };

  journey: JourneyStep[] = [
    { key: 'ideation', image: 'blog.jpg', icon: Lightbulb },
    { key: 'prototype', image: 'events.webp', icon: Rocket },
    { key: 'scale', image: 'member.jpg', icon: TrendingUp }
  ];

  stats: Stat[] = [
    { key: 'projects', value: 120 },
    { key: 'partners', value: 30 },
    { key: 'beneficiaries', value: 10000 }
  ];
}

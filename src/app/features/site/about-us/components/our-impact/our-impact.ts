import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OUR_IMPACT_ITEMS } from '../../data/our-impact.data';
import { LucideAngularModule } from 'lucide-angular';
import { CountUpDirective } from '../../../../../shared/directives/count-up.directive';
import { FadeInOnScrollDirective } from '../../../../../shared/directives/animations-on-scroll.directive';

@Component({
  selector: 'app-our-impact',
  imports: [
    CommonModule,
    LucideAngularModule,
    CountUpDirective,
    FadeInOnScrollDirective,
  ],
  templateUrl: './our-impact.html',
  styles: ``,
})
export class OurImpact {
  our_impact = OUR_IMPACT_ITEMS;
}

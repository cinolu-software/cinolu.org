import { Component } from '@angular/core';
import { About } from '../components/about/about';
import { Vision } from '../components/vision/vision';
import { Mission } from '../components/mission/mission';
import { History } from '../components/history/history';
import { OurImpact } from '../components/our-impact/our-impact';
import { OurTeam } from '../components/our-team/our-team';
import { LucideAngularModule, Info } from 'lucide-angular';
import { HeroCard } from '../../../layout/components/hero-card/hero-card';

@Component({
  selector: 'app-about-us',
  imports: [
    About,
    Vision,
    Mission,
    History,
    OurImpact,
    OurTeam,
    LucideAngularModule,
    HeroCard,
  ],
  templateUrl: './about-us.html',
})
export class AboutUs {
  icons = {
    info: Info,
  };
}

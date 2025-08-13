import { Component } from '@angular/core';
import { About } from '../components/about/about';
import { AboutHero } from '../components/hero/about-hero';
import { Vision } from '../components/vision/vision';
import { Mission } from '../components/mission/mission';
import { History } from '../components/history/history';
import { OurImpact } from '../components/our-impact/our-impact';
import { OurTeam } from '../components/our-team/our-team';

@Component({
  selector: 'app-about-us',
  imports: [
    AboutHero,
    About,
    Vision,
    Mission,
    History,
    OurImpact,
    OurTeam,
  ],
  templateUrl: './about-us.html',
})
export class AboutUs {}

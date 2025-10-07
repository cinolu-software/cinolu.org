import { Component } from '@angular/core';
import { Hero } from '../components/hero/hero';
import { Partners } from '../components/partners/partners';
import { RecentEvents } from '../components/recent-events/recent-events';
import { RecentProjects } from '../components/recent-projects/recent-projects';
import { Services } from '../components/services/services';
import { WhyJoinUs } from '../components/why-join-us/why-join-us';
import { OurPrograms } from '../components/our-programs/our-programs';
import { Highlights } from '../components/highlights/highlights';

@Component({
  selector: 'app-landing-page',
  imports: [Hero, Services, RecentProjects, RecentEvents, Partners, WhyJoinUs, OurPrograms, Highlights],
  templateUrl: './landing-page.html',
})
export class LandingPage {}

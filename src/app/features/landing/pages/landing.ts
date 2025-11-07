import { Component } from '@angular/core';
import { Hero } from '../components/hero/hero';
import { Partners } from '../components/partners/partners';
import { RecentEvents } from '../components/recent-events/recent-events';
import { RecentProjects } from '../components/recent-projects/recent-projects';
import { Services } from '../components/services/services';
import { WhyJoinUs } from '../components/why-join-us/why-join-us';
import { RecentPrograms } from '../components/recent-programs/recent-programs';
import { Highlights } from '../components/highlights/highlights';

@Component({
  selector: 'app-landing',
  imports: [Hero, Services, RecentProjects, RecentEvents, Partners, WhyJoinUs, RecentPrograms, Highlights],
  templateUrl: './landing.html'
})
export class Landing {}

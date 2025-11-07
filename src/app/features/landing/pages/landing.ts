import { Component } from '@angular/core';
import { Hero } from '../components/hero/hero';
import { Partners } from '../components/partners/partners';
import { RecentEvents } from '../components/recent-events/recent-events';
import { RecentProjects } from '../components/recent-projects/recent-projects';
import { WhyJoinUs } from '../components/why-join-us/why-join-us';
import { RecentPrograms } from '../components/recent-programs/recent-programs';
import { Onestop } from '../components/onestop/onestop';
import { Services } from '../components/services/services';

@Component({
  selector: 'app-landing',
  imports: [Hero, RecentProjects, RecentEvents, Partners, WhyJoinUs, RecentPrograms, Onestop, Services],
  templateUrl: './landing.html'
})
export class Landing {}

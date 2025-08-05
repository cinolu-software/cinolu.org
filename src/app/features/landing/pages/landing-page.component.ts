import { Component } from '@angular/core';
import { HeroComponent } from '../components/hero/hero.component';
import { PartnersComponent } from '../components/partners/partners.component';
import { RecentEventsComponent } from '../components/recent-events/recent-events.component';
import { RecentProjectsComponent } from '../components/recent-projects/recent-projects.component';
import { ServicesComponent } from '../components/services/services.component';
import { WhyJoinUsComponent } from '../components/why-join-us/why-join-us.component';
import { OurProgramsComponent } from '../components/our-programs/our-programs.component';

@Component({
  selector: 'app-landing-page',
  imports: [
    HeroComponent,
    ServicesComponent,
    // StatementComponent,
    RecentProjectsComponent,
    RecentEventsComponent,
    PartnersComponent,
    WhyJoinUsComponent,
    OurProgramsComponent
  ],
  templateUrl: './landing-page.component.html'
})
export class LandingPageComponent {}

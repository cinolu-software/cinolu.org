import { Component } from '@angular/core';
import { HeroComponent } from './feature/hero/hero.component';
import { AboutComponent } from './feature/about/about.component';
import { TeamComponent } from './feature/team/team.component';
import { VisionComponent } from './feature/vision/vision.component';
import { FooterComponent } from 'app/shared/ui/footer/footer.component';
import { ServicesComponent } from './feature/services/services.component';
import { StatsComponent } from './feature/stats/stats.component';
import { StatementComponent } from './feature/statement/statement.component';
import { PartnersComponent } from './feature/partners/partners.component';
import { RecentProgramsComponent } from './feature/recent-programs/recent-programs.component';
import { RecentEventsComponent } from './feature/recent-events/recent-events.component';

@Component({
  selector: 'app-landing',
  imports: [
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    TeamComponent,
    StatementComponent,
    VisionComponent,
    FooterComponent,
    StatsComponent,
    PartnersComponent,
    RecentProgramsComponent,
    RecentEventsComponent
  ],
  templateUrl: './landing.component.html'
})
export class LandingComponent {}

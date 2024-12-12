import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/ui/footer/footer.component';
import { AboutComponent } from '../about/about.component';
import { HeroComponent } from '../hero/hero.component';
import { PartnersComponent } from '../partners/partners.component';
import { RecentEventsComponent } from '../recent-events/recent-events.component';
import { RecentProgramsComponent } from '../recent-programs/recent-programs.component';
import { ServicesComponent } from '../services/services.component';
import { StatementComponent } from '../statement/statement.component';
import { StatsComponent } from '../stats/stats.component';
import { TeamComponent } from '../team/team.component';
import { VisionComponent } from '../vision/vision.component';

@Component({
  selector: 'app-home',
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
  templateUrl: './home.component.html'
})
export class HomeComponent {}

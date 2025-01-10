import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/ui/footer/footer.component';
import { HeroComponent } from '../hero/hero.component';
import { PartnersComponent } from '../partners/partners.component';
import { RecentEventsComponent } from '../recent-events/recent-events.component';
import { RecentProjectsComponent } from '../recent-projects/recent-projects.component';
import { ServicesComponent } from '../services/services.component';
import { StatementComponent } from '../statement/statement.component';
import { StatsComponent } from '../stats/stats.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    ServicesComponent,
    StatementComponent,
    FooterComponent,
    StatsComponent,
    PartnersComponent,
    RecentProjectsComponent,
    RecentEventsComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {}

import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
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
    StatsComponent,
    RecentProjectsComponent,
    RecentEventsComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {}

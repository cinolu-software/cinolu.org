import { Component } from '@angular/core';
import { HeroComponent } from './feature/hero/hero.component';
import { AboutComponent } from './feature/about/about.component';
import { TeamComponent } from './feature/team/team.component';
import { ProblemStatementComponent } from './feature/problem-statement/problem-statement.component';
import { VisionComponent } from './feature/vision/vision.component';
import { FooterComponent } from 'app/shared/ui/footer/footer.component';
import { ServicesComponent } from './feature/services/services.component';
import { StatsComponent } from './feature/stats/stats.component';

@Component({
  selector: 'app-landing',
  imports: [
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    TeamComponent,
    ProblemStatementComponent,
    VisionComponent,
    FooterComponent,
    StatsComponent
  ],
  templateUrl: './landing.component.html'
})
export class LandingComponent {}

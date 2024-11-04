import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { TeamComponent } from './components/team/team.component';
import { FooterComponent } from '@core/components/footer/footer.component';
import { ProblemStatementComponent } from './components/problem-statement/problem-statement.component';
import { VisionComponent } from './components/vision/vision.component';
import { ServicesComponent } from './components/services/services.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    TeamComponent,
    FooterComponent,
    ProblemStatementComponent,
    VisionComponent
  ],
  templateUrl: './landing.component.html'
})
export class LandingComponent {}

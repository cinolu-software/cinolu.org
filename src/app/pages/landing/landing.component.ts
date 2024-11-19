import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { TeamComponent } from './components/team/team.component';
import { ProblemStatementComponent } from './components/problem-statement/problem-statement.component';
import { VisionComponent } from './components/vision/vision.component';
import { FooterComponent } from 'app/common/components/footer/footer.component';
import { ServicesComponent } from './components/services/services.component';
import { TopbarComponent } from '../../common/components/topbar/topbar.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    TeamComponent,
    ProblemStatementComponent,
    VisionComponent,
    FooterComponent,
    TopbarComponent
  ],
  templateUrl: './landing.component.html'
})
export class LandingComponent {}

import { Component } from '@angular/core';
import { HeroComponent } from './slots/hero/hero.component';
import { AboutComponent } from './slots/about/about.component';
import { TeamComponent } from './slots/team/team.component';
import { FooterComponent } from '@core/components/footer/footer.component';
import { ProblemStatementComponent } from './slots/problem-statement/problem-statement.component';
import { OurAimComponent } from './slots/our-aim/our-aim.component';
import { OurVisionComponent } from './slots/our-vision/our-vision.component';
import { ServicesComponent } from './slots/services/services.component';

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
    OurAimComponent,
    OurVisionComponent
  ],
  templateUrl: './landing.component.html'
})
export class LandingComponent {}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { TeamComponent } from './components/team/team.component';
import { TopbarComponent } from 'app/core/topbar/topbar.component';
import { FooterComponent } from 'app/core/footer/footer.component';
import { ProblemStatementComponent } from './components/problem-statement/problem-statement.component';
import { OurAimComponent } from './components/our-aim/our-aim.component';
import { OurVisionComponent } from './components/our-vision/our-vision.component';
import { OfferingsComponent } from './components/offerings/offerings.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    OfferingsComponent,
    TeamComponent,
    TopbarComponent,
    FooterComponent,
    ProblemStatementComponent,
    OurAimComponent,
    OurVisionComponent
  ],
  templateUrl: './landing.component.html'
})
export class LandingComponent {}

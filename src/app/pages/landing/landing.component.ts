import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HeroComponent } from './slots/hero/hero.component';
import { AboutComponent } from './slots/about/about.component';
import { TeamComponent } from './slots/team/team.component';
import { FooterComponent } from 'app/common/components/footer/footer.component';
import { ProblemStatementComponent } from './slots/problem-statement/problem-statement.component';
import { OurAimComponent } from './slots/our-aim/our-aim.component';
import { OurVisionComponent } from './slots/our-vision/our-vision.component';
import { OfferingsComponent } from './slots/offerings/offerings.component';
import { Store } from '@ngrx/store';
import { authActions } from 'app/common/store/app.actions';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    OfferingsComponent,
    TeamComponent,
    FooterComponent,
    ProblemStatementComponent,
    OurAimComponent,
    OurVisionComponent
  ],
  templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit {
  #store = inject(Store);

  ngOnInit(): void {
    this.#store.dispatch(authActions.authentication());
  }
}

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { TeamComponent } from './components/team/team.component';
import { FooterComponent } from 'app/common/components/footer/footer.component';
import { ProblemStatementComponent } from './components/problem-statement/problem-statement.component';
import { OurAimComponent } from './components/our-aim/our-aim.component';
import { OurVisionComponent } from './components/our-vision/our-vision.component';
import { OfferingsComponent } from './components/offerings/offerings.component';
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
  private _store = inject(Store);

  ngOnInit(): void {
    this._store.dispatch(authActions.authentication());
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { TeamComponent } from './components/team/team.component';
import { PurposesComponent } from './components/purposes/purposes.component';
import { TopbarComponent } from 'app/core/topbar/topbar.component';
import { FooterComponent } from 'app/core/footer/footer.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutComponent,
    ServicesComponent,
    TeamComponent,
    PurposesComponent,
    TopbarComponent,
    FooterComponent
  ],
  templateUrl: './landing.component.html'
})
export class LandingComponent {}

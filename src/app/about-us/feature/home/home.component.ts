import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { AboutHeroComponent } from '../hero/about-hero.component';
import { TeamComponent } from '../team/team.component';
import { VisionComponent } from '../vision/vision.component';

@Component({
  selector: 'app-home',
  imports: [AboutHeroComponent, AboutComponent, TeamComponent, VisionComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {}

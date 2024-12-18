import { Component } from '@angular/core';
import { FooterComponent } from '../../../shared/ui/footer/footer.component';
import { AboutComponent } from '../about/about.component';
import { HeroComponent } from '../hero/hero.component';
import { TeamComponent } from '../team/team.component';
import { VisionComponent } from '../vision/vision.component';

@Component({
  selector: 'app-home',
  imports: [HeroComponent, AboutComponent, TeamComponent, VisionComponent, FooterComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {}

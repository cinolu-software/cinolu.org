import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { AboutHeroComponent } from '../hero/about-hero.component';
import { VisionComponent } from '../vision/vision.component';

@Component({
  selector: 'app-home',
  imports: [AboutHeroComponent, AboutComponent, VisionComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {}

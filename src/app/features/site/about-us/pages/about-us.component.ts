import { Component } from '@angular/core';
import { AboutComponent } from '../components/about/about.component';
import { AboutHeroComponent } from '../components/hero/about-hero.component';
import { VisionComponent } from '../components/vision/vision.component';

@Component({
  selector: 'app-about-us',
  imports: [AboutHeroComponent, AboutComponent, VisionComponent],
  templateUrl: './about-us.component.html'
})
export class AboutUsComponent {}

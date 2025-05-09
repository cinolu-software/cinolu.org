import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { AboutHeroComponent } from '../hero/about-hero.component';
import { VisionComponent } from '../vision/vision.component';
import { TopbarComponent } from '../../../shared/layout/ui/topbar/topbar.component';
import { FooterComponent } from '../../../shared/layout/ui/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [AboutHeroComponent, AboutComponent, VisionComponent, TopbarComponent, FooterComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent {}

import { Component } from '@angular/core';
import { AboutComponent } from '../components/about/about.component';
import { AboutHeroComponent } from '../components/hero/about-hero.component';
import { VisionComponent } from '../components/vision/vision.component';
import { MissionComponent } from '../components/mission/mission.component';
import { HistoryComponent } from '../components/history/history.component';
import { OurImpactComponent } from '../components/our-impact/our-impact.component';
import { OurTeamComponent } from '../components/our-team/our-team.component';

@Component({
  selector: 'app-about-us',
  imports: [
    AboutHeroComponent,
    AboutComponent,
    VisionComponent,
    MissionComponent,
    HistoryComponent,
    OurImpactComponent,
    OurTeamComponent,
  ],
  templateUrl: './about-us.component.html',
})
export class AboutUsComponent {}

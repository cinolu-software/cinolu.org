import { Component } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { RecentEventsComponent } from '../recent-events/recent-events.component';
import { RecentProjectsComponent } from '../recent-projects/recent-projects.component';
import { ServicesComponent } from '../services/services.component';
import { StatementComponent } from '../statement/statement.component';
import { EcosytemComponent } from '../ecosystem/ecosystem.component';
import { TopbarComponent } from '../../../shared/layout/ui/topbar/topbar.component';
import { FooterComponent } from '../../../shared/layout/ui/footer/footer.component';

@Component({
  selector: 'app-home',
  imports: [
    HeroComponent,
    ServicesComponent,
    StatementComponent,
    RecentProjectsComponent,
    RecentEventsComponent,
    EcosytemComponent,
    TopbarComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html'
})
export class HomeComponent {}

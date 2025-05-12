import { afterNextRender, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './shared/ui/loader/loader.component';
import AOS from 'aos';
import { Toast } from 'primeng/toast';
import { LoadingBarComponent } from './shared/ui/loading-bar/loading-bar.component';
import { environment } from 'environments/environment';
import { GoogleAnalyticsService } from './shared/services/google/google-analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, CommonModule, Toast, LoaderComponent, LoadingBarComponent]
})
export class AppComponent implements OnInit {
  #googleAnalyticsService = inject(GoogleAnalyticsService);

  constructor() {
    afterNextRender(() => {
      AOS.init();
    });
  }

  ngOnInit(): void {
    if (environment.googleAnalyticsId) this.#googleAnalyticsService.initialize();
  }
}

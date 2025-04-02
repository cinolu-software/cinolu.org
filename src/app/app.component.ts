import { afterNextRender, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './shared/ui/loader/loader.component';
import AOS from 'aos';
import { Toast } from 'primeng/toast';
import { LoadingBarComponent } from './shared/ui/loading-bar/loading-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, CommonModule, Toast, LoaderComponent, LoadingBarComponent]
})
export class AppComponent {
  constructor() {
    afterNextRender(() => {
      AOS.init();
    });
  }
}

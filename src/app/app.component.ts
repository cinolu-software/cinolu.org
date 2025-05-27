import { afterNextRender, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from './shared/ui/loader/loader.component';
import AOS from 'aos';
import { LoadingBarComponent } from './shared/ui/loading-bar/loading-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, LoaderComponent, LoadingBarComponent],
})
export class AppComponent {
  constructor() {
    afterNextRender(() => {
      AOS.init({
        offset: 50,
      });
    });
  }
}

import { afterNextRender, Component, inject, NgZone } from '@angular/core';
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
  #ngZone = inject(NgZone);

  constructor() {
    afterNextRender(() => {
      this.#ngZone.runOutsideAngular(() => {
        AOS.init({
          offset: 50,
        });
      });
    });
  }
}

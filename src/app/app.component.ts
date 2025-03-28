import { afterNextRender, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './shared/ui/loader/loader.component';
import AOS from 'aos';
import { Toast } from 'primeng/toast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, CommonModule, Toast, LoaderComponent]
})
export class AppComponent {
  constructor() {
    afterNextRender(() => {
      AOS.init();
    });
  }
}

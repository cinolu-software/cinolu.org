import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from './shared/ui/topbar/topbar.component';
import { LoaderComponent } from './shared/ui/loader/loader.component';
import { LoadingBarComponent } from './shared/ui/loading-bar/loading-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, TopbarComponent, LoaderComponent, LoadingBarComponent]
})
export class AppComponent {}

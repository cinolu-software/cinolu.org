import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarComponent } from 'app/shared/ui/loading-bar/loading-bar.component';
import { TopbarComponent } from './shared/ui/topbar/topbar.component';
import { LoaderComponent } from './shared/ui/loader/loader.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, LoadingBarComponent, TopbarComponent, LoaderComponent]
})
export class AppComponent {}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarComponent } from 'app/shared/ui/loading-bar/loading-bar.component';
import { TopbarComponent } from './shared/ui/topbar/topbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, LoadingBarComponent, TopbarComponent]
})
export class AppComponent {}

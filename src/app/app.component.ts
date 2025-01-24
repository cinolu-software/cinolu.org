import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/ui/menu/menu.component';
import { LoaderComponent } from './shared/ui/loader/loader.component';
import { LoadingBarComponent } from './shared/ui/loading-bar/loading-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, MenuComponent, LoaderComponent, LoadingBarComponent]
})
export class AppComponent {}

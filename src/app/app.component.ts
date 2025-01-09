import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarComponent } from 'app/shared/ui/loading-bar/loading-bar.component';
import { MenuComponent } from './shared/ui/menu/menu.component';
import { LoaderComponent } from './shared/ui/loader/loader.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, LoadingBarComponent, MenuComponent, LoaderComponent]
})
export class AppComponent {}

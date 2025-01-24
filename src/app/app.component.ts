import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './shared/ui/menu/menu.component';
import { LoaderComponent } from './shared/ui/loader/loader.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, MenuComponent, LoaderComponent]
})
export class AppComponent {}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarComponent } from '../../../ui/loading-bar/loading-bar.component';

@Component({
  selector: 'app-empty-layout',
  templateUrl: './empty-layout.component.html',
  imports: [RouterOutlet, LoadingBarComponent]
})
export class EmptyLayoutComponent {}

import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingBarComponent } from '@core/components/loading-bar/loading-bar.component';
import { TopbarComponent } from '@core/components/topbar/topbar.component';

@Component({
  selector: 'app-empty-layout',
  templateUrl: './empty.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [LoadingBarComponent, RouterOutlet, TopbarComponent]
})
export class EmptyLayoutComponent {}

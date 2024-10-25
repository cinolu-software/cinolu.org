import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FuseLoadingBarComponent } from '@core/components/loading-bar/loading-bar.component';

@Component({
  selector: 'app-empty-layout',
  templateUrl: './empty.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [FuseLoadingBarComponent, RouterOutlet]
})
export class EmptyLayoutComponent {}

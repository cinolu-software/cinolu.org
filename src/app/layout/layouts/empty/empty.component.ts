import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FuseLoadingBarComponent } from '@fuse/components/loading-bar';
import { TopbarComponent } from 'app/core/components/topbar/topbar.component';

@Component({
  selector: 'empty-layout',
  templateUrl: './empty.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [FuseLoadingBarComponent, RouterOutlet, TopbarComponent]
})
export class EmptyLayoutComponent {}

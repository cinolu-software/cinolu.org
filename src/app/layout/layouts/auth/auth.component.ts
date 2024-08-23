import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FuseLoadingBarComponent } from '@fuse/components/loading-bar';
import { TopbarComponent } from 'app/core/topbar/topbar.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'auth-layout',
  templateUrl: './auth.component.html',
  encapsulation: ViewEncapsulation.None,
  standalone: true,
  imports: [FuseLoadingBarComponent, RouterOutlet, TopbarComponent]
})
export class AuthLayoutComponent {}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppTopbarComponent } from '../../shared/components/app-topbar/app-topbar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  imports: [RouterOutlet, AppTopbarComponent, FooterComponent]
})
export class FullLayoutComponent {}

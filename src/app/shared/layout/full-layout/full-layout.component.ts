import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AppTopbarComponent } from '../../components/app-topbar/app-topbar.component';
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  imports: [RouterOutlet, AppTopbarComponent, FooterComponent],
})
export class FullLayoutComponent {}

import { Component, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopbarComponent } from '../../ui/topbar/topbar.component';
import { FooterComponent } from '../../ui/footer/footer.component';

@Component({
  selector: 'app-full-layout',
  templateUrl: './full-layout.component.html',
  imports: [RouterOutlet, TopbarComponent, FooterComponent],
})
export class FullLayoutComponent {
  fixedHeader = input<boolean>(false);
}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Info } from 'lucide-angular';

@Component({
  selector: 'app-about-hero',
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './about-hero.component.html'
})
export class AboutHeroComponent {
  icons = {
    info: Info
  };
}

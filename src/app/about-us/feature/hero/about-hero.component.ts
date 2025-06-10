import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { fadeInStagger } from '../../../shared/animations/fade';
import { LucideAngularModule, Info } from 'lucide-angular';

@Component({
  selector: 'app-about-hero',
  imports: [RouterModule, LucideAngularModule],
  animations: [fadeInStagger],
  templateUrl: './about-hero.component.html',
})
export class AboutHeroComponent {
  icons = {
    info: Info,
  };
}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Info } from 'lucide-angular';

@Component({
  selector: 'app-about-hero',
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './about-hero.html',
})
export class AboutHero {
  icons = {
    info: Info,
  };
}

import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Info } from 'lucide-angular';

@Component({
  selector: 'app-parteners-hero',
  imports: [RouterModule, LucideAngularModule],
  templateUrl: './parteners-hero.html'
})
export class PartenersHero {
  icons = {
    info: Info
  };
}

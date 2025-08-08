import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  Lightbulb,
  MoveUpRight,
  UserPlus,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-about',
  imports: [LucideAngularModule, RouterLink],
  templateUrl: './about.component.html',
})
export class AboutComponent {
  icons = {
    lightbulb: Lightbulb,
    moveUp: MoveUpRight,
    userPlus: UserPlus,
  };
}

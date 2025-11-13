import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Lightbulb, MoveUpRight, UserPlus, LucideAngularModule } from 'lucide-angular';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  imports: [LucideAngularModule, RouterLink, TranslateModule],
  templateUrl: './about.html'
})
export class About {
  icons = {
    lightbulb: Lightbulb,
    moveUp: MoveUpRight,
    userPlus: UserPlus
  };
}

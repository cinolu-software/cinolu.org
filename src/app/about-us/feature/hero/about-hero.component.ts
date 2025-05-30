
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NgIcon } from '@ng-icons/core';
import { fadeInStagger } from '../../../shared/animations/fade';

@Component({
  selector: 'app-about-hero',
  imports: [RouterModule, NgIcon],
  animations: [fadeInStagger],
  templateUrl: './about-hero.component.html',
})
export class AboutHeroComponent {}

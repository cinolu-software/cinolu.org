import { CommonModule } from '@angular/common';
import { afterNextRender, Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { stakeholders } from './utils/data/stakeholders';
import { OwlOptions, CarouselModule } from 'ngx-owl-carousel-o';
import { SlideOneComponent } from './slides/slide-one/slide-one.component';
import { SlideTwoComponent } from './slides/slide-two/slide-two.component';
import { SlideThreeComponent } from './slides/slide-three/slide-three.component';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [MatIconModule, CommonModule, CarouselModule, SlideOneComponent, SlideTwoComponent, SlideThreeComponent],
  templateUrl: './hero.component.html'
})
export class HeroComponent {
  stakeholdersPurposes = stakeholders;
  options: OwlOptions;
  isBrowser = signal<boolean>(false);

  constructor() {
    afterNextRender(() => this.isBrowser.set(true));
    this.options = {
      mouseDrag: false,
      touchDrag: false,
      loop: true,
      dots: false,
      nav: false,
      items: 1
    };
  }
}

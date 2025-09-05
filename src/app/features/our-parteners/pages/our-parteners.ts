import { Component } from '@angular/core';
import { PARTNERS } from '../../landing/data/partners.data';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { PartenersHero } from '../component/hero/partenes-hero';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';

@Component({
  selector: 'app-our-parteners',
  imports: [
    NgOptimizedImage,
    CommonModule,
    PartenersHero,
    AnimateOnScrollModule,
  ],
  templateUrl: './our-parteners.html',
  styles: ``,
})
export class OurParteners {
  parteners = PARTNERS;
}

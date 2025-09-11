import { Component } from '@angular/core';
import { PARTNERS } from '../../landing/data/partners.data';
import { CommonModule } from '@angular/common';
import { PartenersHero } from '../component/hero/partenes-hero';
import { AnimateOnScrollModule } from 'primeng/animateonscroll';
import { Image } from 'primeng/image';

@Component({
  selector: 'app-our-parteners',
  imports: [CommonModule, PartenersHero, AnimateOnScrollModule, Image],
  templateUrl: './our-parteners.html',
  styles: ``,
})
export class OurParteners {
  parteners = PARTNERS;
}

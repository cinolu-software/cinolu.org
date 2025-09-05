import { Component } from '@angular/core';
import { PARTNERS } from '../../landing/data/partners.data';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-our-parteners',
  imports: [NgOptimizedImage, CommonModule],
  templateUrl: './our-parteners.html',
  styles: ``,
})
export class OurParteners {
  parteners = PARTNERS;
}

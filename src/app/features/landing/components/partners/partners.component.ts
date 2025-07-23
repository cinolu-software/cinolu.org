import { Component } from '@angular/core';
import { PARTNERS } from '../../data/partners.data';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-partners',
  imports: [NgOptimizedImage],
  templateUrl: './partners.component.html'
})
export class PartnersComponent {
  partners = PARTNERS;
}

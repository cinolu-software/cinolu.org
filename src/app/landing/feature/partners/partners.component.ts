import { Component } from '@angular/core';
import { partners } from '../../utils/data/partners';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-partners',
  imports: [NgOptimizedImage],
  templateUrl: './partners.component.html'
})
export class PartnersComponent {
  partners = partners;
}

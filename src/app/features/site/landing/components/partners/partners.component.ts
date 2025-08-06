import { Component } from '@angular/core';
import { PARTNERS, PARTNERS_CATEGORIES } from '../../data/partners.data';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { Select } from 'primeng/select';
import { FadeInOnScrollDirective } from '../../../../../shared/directives/animations-on-scroll.directive';

@Component({
  selector: 'app-partners',
  imports: [NgOptimizedImage, CommonModule, FadeInOnScrollDirective, InputGroupModule, InputGroupAddonModule, Select],
  templateUrl: './partners.component.html'
})
export class PartnersComponent {
  partners = PARTNERS;
  categoryParteners = PARTNERS_CATEGORIES;

  statutItem = [
    { id: 1, name: 'Étudiant·e' },
    { id: 2, name: 'Entrepreneur·e' },
    { id: 3, name: 'Volontaire' },
    { id: 4, name: 'Chercheur·se' },
    { id: 5, name: 'Autre' }
  ];

  date: Date | undefined;

  selectedUserId = 0;

  selectUserType(type: number) {
    this.selectedUserId = type;
  }
}

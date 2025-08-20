import { Component } from '@angular/core';
import { PARTNERS, PARTNERS_CATEGORIES } from '../../data/partners.data';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { FadeInOnScrollDirective } from '../../../../shared/directives/animations-on-scroll.directive';
import { UserPlus, LucideAngularModule } from 'lucide-angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-partners',
  imports: [
    NgOptimizedImage,
    CommonModule,
    FadeInOnScrollDirective,
    InputGroupModule,
    InputGroupAddonModule,
    LucideAngularModule,
    RouterLink
  ],
  templateUrl: './partners.html',
})
export class Partners {
  partners = PARTNERS;
  categoryParteners = PARTNERS_CATEGORIES;

  icons = {
    userPlus: UserPlus,
  };

  statutItem = [
    { id: 1, name: 'Étudiant·e' },
    { id: 2, name: 'Entrepreneur·e' },
    { id: 3, name: 'Volontaire' },
    { id: 4, name: 'Chercheur·se' },
    { id: 5, name: 'Autre' },
  ];

  date: Date | undefined;

  selectedUserId = 0;

  selectUserType(type: number) {
    this.selectedUserId = type;
  }
}

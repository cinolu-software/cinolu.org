import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { EcosystemService } from 'app/landing/data-access/ecosystem.service';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { ICategory, IMember } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-ecosystem',
  providers: [EcosystemService],
  imports: [CommonModule, NgIcon, NgOptimizedImage, ApiImgPipe],
  templateUrl: './ecosystem.component.html'
})
export class EcosytemComponent implements OnInit {
  #ecosystemService = inject(EcosystemService);
  categories$: Observable<IAPIResponse<ICategory[]>>;
  members$: Observable<IAPIResponse<IMember[]>>;
  skeletonArray = new Array(24);
  activeTab = signal<string>('Tous');
  icons = {
    Startups: 'matLightbulbOutline',
    'SAEI & ESOs': 'matTravelExploreOutline',
    Corporates: 'matLocationCityOutline',
    Institutions: 'matEmojiFlagsOutline',
    Partners: 'matAllInclusiveOutline'
  };

  constructor() {
    effect(() => {
      this.getMembersByCategory(this.activeTab());
    });
  }

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }

  getMembersByCategory(category: string) {
    this.members$ =
      category === 'Tous' ? this.#ecosystemService.getMembers() : this.#ecosystemService.getMembersByCategory(category);
  }

  ngOnInit() {
    this.categories$ = this.#ecosystemService.getCategories();
    this.members$ = this.#ecosystemService.getMembers();
  }
}

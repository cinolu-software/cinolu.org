import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { NgIcon } from '@ng-icons/core';
import { EcosystemService } from 'app/landing/data-access/ecosystem.service';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { Observable, Subscription } from 'rxjs';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { IOrganization } from 'app/shared/utils/types/models.type';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-ecosystem',
  providers: [EcosystemService],
  imports: [CommonModule, NgIcon, NgOptimizedImage, ApiImgPipe],
  templateUrl: './ecosystem.component.html'
})
export class EcosytemComponent implements OnInit {
  #ecosystemService = inject(EcosystemService);
  categoryCounts$: Observable<IAPIResponse<{ category: string; count: number }[]>>;
  organizations = signal<IOrganization[]>([]);
  filteredOrganizations = signal<IOrganization[]>([]);
  subscrption: Subscription;
  skeletonArray = new Array(24);
  activeTab = signal<string>('Total');

  constructor() {
    this.#ecosystemService
      .getOrganizations()
      .pipe(takeUntilDestroyed())
      .subscribe((res) => {
        this.organizations.set(res.data);
      });

    effect(() => {
      const category = this.activeTab();
      const organizations = this.organizations();
      this.filteredOrganizations.set(
        category === 'Total'
          ? organizations
          : organizations.filter((org) => org.categories?.some((cat) => cat.name === category))
      );
    });
  }

  setActiveTab(tab: string) {
    this.activeTab.set(tab);
  }

  ngOnInit(): void {
    this.categoryCounts$ = this.#ecosystemService.getCategoryCount();
  }
}

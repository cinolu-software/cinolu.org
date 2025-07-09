import { CommonModule, Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ArrowLeft, LucideAngularModule, Info, Box } from 'lucide-angular';
import { EditEnterpriseInfoComponent } from './info/edit-info.component';
import { EnterpriseStore } from '../../../data-access/enterprises/enterprise.store';
import { ProductsComponent } from './products/products.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-enterprise',
  providers: [EnterpriseStore],
  imports: [LucideAngularModule, CommonModule, EditEnterpriseInfoComponent, ProductsComponent],
  templateUrl: './edit-enterprise.component.html'
})
export class EditEnterpriseComponent {
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  #location = inject(Location);
  icons = { back: ArrowLeft };
  store = inject(EnterpriseStore);
  activeTab = signal(this.#route.snapshot.queryParams?.['tab'] || 'info');
  tabs = signal([
    { label: 'Informations', value: 'info', icon: Info },
    { label: 'Produits', value: 'products', icon: Box }
  ]);

  setActiveTab(tab: string): void {
    this.#router.navigate(['/profile/enterprises/update', this.store.enterprise()?.slug], {
      queryParams: { tab: tab === 'info' ? null : tab }
    });
    this.activeTab.set(tab);
  }

  back(): void {
    this.#location.back();
  }
}

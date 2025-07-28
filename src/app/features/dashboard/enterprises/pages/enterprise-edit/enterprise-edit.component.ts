import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ArrowLeft, LucideAngularModule, Info, Box } from 'lucide-angular';
import { EditEnterpriseInfoComponent } from './edit-info/edit-info.component';
import { EnterpriseStore } from '../../store/enterprises/enterprise.store';
import { ProductsListComponent } from './products-list/products-list.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-edit-enterprise',
  providers: [EnterpriseStore],
  imports: [LucideAngularModule, RouterLink, CommonModule, EditEnterpriseInfoComponent, ProductsListComponent],
  templateUrl: './enterprise-edit.component.html'
})
export class EnterpriseEditComponent {
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  icons = { back: ArrowLeft };
  store = inject(EnterpriseStore);
  activeTab = signal(this.#route.snapshot.queryParams?.['tab'] || 'info');
  tabs = signal([
    { label: 'Informations', value: 'info', icon: Info },
    { label: 'Produits', value: 'products', icon: Box }
  ]);

  setActiveTab(tab: string): void {
    this.#router.navigate(['/dashboard/enterprises/update', this.store.enterprise()?.slug], {
      queryParams: { tab: tab === 'info' ? null : tab }
    });
    this.activeTab.set(tab);
  }
}

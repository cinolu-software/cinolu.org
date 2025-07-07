import { CommonModule, Location } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ArrowLeft, LucideAngularModule, Info, Box } from 'lucide-angular';
import { EditEnterpriseInfoComponent } from './info/edit-info.component';
import { Enterprisetore } from '../../../data-access/enterprises/enterprise.store';

@Component({
  selector: 'app-edit-enterprise',
  providers: [Enterprisetore],
  imports: [LucideAngularModule, CommonModule, EditEnterpriseInfoComponent],
  templateUrl: './edit-enterprise.component.html'
})
export class EditEnterpriseComponent {
  #location = inject(Location);
  icons = { back: ArrowLeft };
  tabs = signal([
    { label: 'Informations', value: 'info', icon: Info },
    { label: 'Produits', value: 'products', icon: Box }
  ]);
  activeTab = signal('info');
  store = inject(Enterprisetore);

  setActiveTab(tab: string): void {
    this.activeTab.set(tab);
  }

  back(): void {
    this.#location.back();
  }
}

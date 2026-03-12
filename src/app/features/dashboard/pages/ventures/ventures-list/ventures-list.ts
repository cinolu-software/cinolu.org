import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VenturesStore } from '../../../store/ventures.store';
import { ProductsStore } from '../../../store/products.store';
import { ApiImgPipe } from '@shared/pipes/api-img.pipe';
import { IconComponent } from '@shared/ui';

@Component({
  selector: 'app-ventures-list',
  imports: [RouterModule, ApiImgPipe, DecimalPipe, IconComponent],
  templateUrl: './ventures-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VenturesUnified implements OnInit {
  venturesStore = inject(VenturesStore);
  productsStore = inject(ProductsStore);

  activeTab = signal<'ventures' | 'products'>('ventures');

  ngOnInit() {
    this.venturesStore.loadAllVentures();
    this.productsStore.loadAllProducts();
  }

  switchTab(tab: 'ventures' | 'products') {
    this.activeTab.set(tab);
  }

  deleteVenture(id: string, name: string) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) {
      this.venturesStore.deleteVenture({ id });
    }
  }

  deleteProduct(id: string, name: string) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) {
      this.productsStore.deleteProduct(id);
    }
  }
}

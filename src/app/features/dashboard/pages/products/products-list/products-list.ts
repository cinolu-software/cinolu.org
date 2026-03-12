import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsStore } from '@features/dashboard/store/products.store';
import { IconComponent } from '@shared/ui';

@Component({
  selector: 'app-products-list',
  imports: [RouterModule, DecimalPipe, IconComponent],
  templateUrl: './products-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductsList implements OnInit {
  productsStore = inject(ProductsStore);

  ngOnInit() {
    this.productsStore.loadAllProducts();
  }

  deleteProduct(id: string, name: string) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) {
      this.productsStore.deleteProduct(id);
    }
  }
}

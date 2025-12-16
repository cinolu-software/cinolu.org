import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsStore } from '@features/dashboard/services/products.store';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, RouterModule],
  templateUrl: './products-list.html'
})
export class ProductsList implements OnInit {
  productsStore = inject(ProductsStore);

  ngOnInit() {
    this.productsStore.loadAllProducts();
  }

  deleteProduct(id: string, name: string) {
    if (confirm(`Êtes-vous sûr de vouloir supprimer "${name}" ?`)) {
      this.productsStore.deleteProduct({ id });
    }
  }
}

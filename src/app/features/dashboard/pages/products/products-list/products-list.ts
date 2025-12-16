import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsStore } from '@features/dashboard/store/products.store';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-products-list',
  imports: [CommonModule, RouterModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './products-list.html'
})
export class ProductsList implements OnInit {
  productsStore = inject(ProductsStore);
  confirmationService = inject(ConfirmationService);

  ngOnInit() {
    this.productsStore.loadAllProducts();
  }

  deleteProduct(id: string, name: string) {
    this.confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir supprimer "${name}" ?`,
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui, supprimer',
      rejectLabel: 'Annuler',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.productsStore.deleteProduct({ id });
      }
    });
  }
}

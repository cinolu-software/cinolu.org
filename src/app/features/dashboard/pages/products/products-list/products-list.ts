import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductsStore } from '@features/dashboard/store/products.store';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-products-list',
  imports: [RouterModule, ConfirmDialogModule, DecimalPipe],
  providers: [ConfirmationService],
  templateUrl: './products-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
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
        this.productsStore.deleteProduct(id);
      }
    });
  }
}

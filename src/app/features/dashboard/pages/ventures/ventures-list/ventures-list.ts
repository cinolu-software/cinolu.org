import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VenturesStore } from '../../../store/ventures.store';
import { ProductsStore } from '../../../store/products.store';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ApiImgPipe } from '@shared/pipes/api-img.pipe';

@Component({
  selector: 'app-ventures-list',
  imports: [RouterModule, ConfirmDialogModule, ApiImgPipe, DecimalPipe],
  providers: [ConfirmationService],
  templateUrl: './ventures-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VenturesUnified implements OnInit {
  venturesStore = inject(VenturesStore);
  productsStore = inject(ProductsStore);
  confirmationService = inject(ConfirmationService);

  activeTab = signal<'ventures' | 'products'>('ventures');

  ngOnInit() {
    this.venturesStore.loadAllVentures();
    this.productsStore.loadAllProducts();
  }

  switchTab(tab: 'ventures' | 'products') {
    this.activeTab.set(tab);
  }

  deleteVenture(id: string, name: string) {
    this.confirmationService.confirm({
      message: `Êtes-vous sûr de vouloir supprimer "${name}" ?`,
      header: 'Confirmation de suppression',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Oui, supprimer',
      rejectLabel: 'Annuler',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.venturesStore.deleteVenture({ id });
      }
    });
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

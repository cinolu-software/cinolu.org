import { Component, inject, input } from '@angular/core';
import { IProduct } from '../../../../../../common/models/entities.models';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { SquarePen, Eye, LucideAngularModule, Plus, Trash } from 'lucide-angular';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { CurrencyPipe } from '@angular/common';
import { DeleteProductStore } from '../../store/products/delete-product.store';

@Component({
  selector: 'app-product-card',
  providers: [ConfirmationService, DeleteProductStore],
  imports: [ButtonModule, RouterModule, LucideAngularModule, ConfirmPopup, CurrencyPipe],
  templateUrl: './product-card.html',
})
export class ProductCard {
  product = input.required<IProduct>();
  #confirmationService = inject(ConfirmationService);
  store = inject(DeleteProductStore);
  icons = { plus: Plus, edit: SquarePen, trash: Trash, eye: Eye };

  onDeleteProduct(id: string, event: Event): void {
    this.#confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Etes-vous sûr?',
      rejectButtonProps: {
        label: 'Annuler',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Confirmer',
        severity: 'danger',
      },
      accept: () => {
        this.store.deleteProduct(id);
      },
    });
  }
}

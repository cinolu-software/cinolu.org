import { Component, inject, input } from '@angular/core';
import { IVenture } from '../../../../../../common/models/entities.models';
import { NgOptimizedImage } from '@angular/common';
import { ApiImgPipe } from '../../../../../../common/pipes/api-img.pipe';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { SquarePen, Eye, LucideAngularModule, Plus, Trash } from 'lucide-angular';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { DeleteVentureStore } from '../../store/ventures/delete-venture.store';

@Component({
  selector: 'app-venture-card',
  providers: [ConfirmationService, DeleteVentureStore],
  imports: [NgOptimizedImage, ApiImgPipe, ButtonModule, RouterModule, LucideAngularModule, ConfirmPopup],
  templateUrl: './venture-card.html',
})
export class VentureCard {
  venture = input.required<IVenture>();
  deleteVentureStore = inject(DeleteVentureStore);
  #confirmationService = inject(ConfirmationService);
  icons = { plus: Plus, edit: SquarePen, trash: Trash, eye: Eye };

  onDeleteVenture(id: string, event: Event): void {
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
        this.deleteVentureStore.deleteVenture(id);
      },
    });
  }
}

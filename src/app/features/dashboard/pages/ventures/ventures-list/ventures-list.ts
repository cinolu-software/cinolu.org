import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VenturesStore } from '../../../store/ventures.store';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ApiImgPipe } from "../../../../../shared/pipes/api-img.pipe";

@Component({
  selector: 'app-ventures-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmDialogModule, ApiImgPipe],
  providers: [ConfirmationService],
  templateUrl: './ventures-list.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VenturesList implements OnInit {
  venturesStore = inject(VenturesStore);
  confirmationService = inject(ConfirmationService);

  ngOnInit() {
    this.venturesStore.loadAllVentures();
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
}

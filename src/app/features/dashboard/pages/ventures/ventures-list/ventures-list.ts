import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { VenturesStore } from '../../../store/ventures.store';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-ventures-list',
  standalone: true,
  imports: [CommonModule, RouterModule, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './ventures-list.html'
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

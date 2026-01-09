import { Component, inject, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VenturesStore } from '../../../store/ventures.store';
import { ProductsStore } from '../../../store/products.store';
import { ApiImgPipe } from '@shared/pipes/api-img.pipe';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-venture-details',
  standalone: true,
  imports: [CommonModule, RouterModule, ApiImgPipe, NgOptimizedImage, ConfirmDialogModule],
  providers: [ConfirmationService],
  templateUrl: './venture-details.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VentureDetails implements OnInit {
  route = inject(ActivatedRoute);
  router = inject(Router);
  venturesStore = inject(VenturesStore);
  productsStore = inject(ProductsStore);
  confirmationService = inject(ConfirmationService);

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.venturesStore.loadVentureBySlug(slug);
    }
  }

  editVenture() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.router.navigate(['/dashboard/ventures/edit', slug]);
    }
  }

  goBack() {
    this.router.navigate(['/dashboard/ventures']);
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

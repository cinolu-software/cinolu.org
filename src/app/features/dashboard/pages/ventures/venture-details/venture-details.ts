import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { NgOptimizedImage, DecimalPipe, DatePipe } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VenturesStore } from '../../../store/ventures.store';
import { ProductsStore } from '../../../store/products.store';
import { ApiImgPipe } from '@shared/pipes/api-img.pipe';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import {
  LucideAngularModule,
  Eye,
  X,
  ChevronLeft,
  ChevronRight,
  Edit,
  Target,
  Users,
  ShoppingBag,
  Package,
  Briefcase
} from 'lucide-angular';
import type { IImage } from '@shared/models';

@Component({
  selector: 'app-venture-details',
  imports: [
    RouterModule,
    ApiImgPipe,
    NgOptimizedImage,
    ConfirmDialogModule,
    DecimalPipe,
    DatePipe,
    LucideAngularModule
  ],
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

  lightboxOpen = signal(false);
  lightboxImages = signal<IImage[]>([]);
  lightboxIndex = signal(0);

  icons = {
    eye: Eye,
    x: X,
    chevronLeft: ChevronLeft,
    chevronRight: ChevronRight,
    edit: Edit,
    target: Target,
    users: Users,
    shoppingBag: ShoppingBag,
    package: Package,
    briefcase: Briefcase
  };

  openLightbox(images: IImage[], index: number): void {
    this.lightboxImages.set(images);
    this.lightboxIndex.set(index);
    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
    document.body.style.overflow = '';
  }

  nextLightboxImage(): void {
    const current = this.lightboxIndex();
    const total = this.lightboxImages().length;
    this.lightboxIndex.set((current + 1) % total);
  }

  previousLightboxImage(): void {
    const current = this.lightboxIndex();
    const total = this.lightboxImages().length;
    this.lightboxIndex.set((current - 1 + total) % total);
  }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.venturesStore.loadVentureBySlug(slug);
    }
  }

  editVenture() {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.router.navigate(['/dashboard/user/ventures/edit', slug]);
    }
  }

  goBack() {
    this.router.navigate(['/dashboard/user/ventures']);
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

  getInitials(name: string): string {
    return name
      .split(' ')
      .map((word) => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}

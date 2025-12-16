import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VenturesStore } from '../../../store/ventures.store';
import { IProduct } from '@shared/models/entities.models';
import { ProductsStore } from '@features/dashboard/store/products.store';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-form.html'
})
export class ProductForm implements OnInit {
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  productsStore = inject(ProductsStore);
  venturesStore = inject(VenturesStore);

  isEditMode = signal(false);
  currentSlug: string | null = null;

  form = this.fb.group({
    ventureId: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]]
  });

  constructor() {
    effect(() => {
      const product = this.productsStore.selectedProduct();
      if (product && this.isEditMode() && !this.productsStore.isLoading()) {
        this.form.patchValue(
          {
            ventureId: product.venture?.id || '',
            name: product.name || '',
            description: product.description || '',
            price: product.price || 0
          },
          { emitEvent: false }
        );
      }
    });
  }
  ngOnInit() {
    this.venturesStore.loadAllVentures();
    this.currentSlug = this.route.snapshot.paramMap.get('slug');
    if (this.currentSlug) {
      this.isEditMode.set(true);
      this.productsStore.loadProductBySlug(this.currentSlug);
    }
  }
  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;

    if (this.isEditMode() && this.currentSlug) {
      this.productsStore.updateProduct({
        slug: this.currentSlug,
        data: formData as Partial<IProduct>,
        onSuccess: () => this.router.navigate(['/dashboard/products'])
      });
    } else {
      this.productsStore.createProduct({
        data: formData as Partial<IProduct> & { ventureId: string },
        onSuccess: () => this.router.navigate(['/dashboard/products'])
      });
    }
  }

  cancel() {
    this.router.navigate(['/dashboard/products']);
  }
}

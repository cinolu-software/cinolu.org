import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VenturesStore } from '../../services/ventures.store';
import { ToastrService } from '@core/services/toast/toastr.service';
import { IProduct } from '@shared/models/entities.models';
import { ProductsStore } from '@features/dashboard/services/products.store';

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

  toast = inject(ToastrService);

  isEditMode = signal(false);
  currentSlug: string | null = null;

  form = this.fb.group({
    ventureId: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
    price: [0, [Validators.required, Validators.min(0)]]
  });

  ngOnInit() {
    this.venturesStore.loadAllVentures();
    this.currentSlug = this.route.snapshot.paramMap.get('slug');
    if (this.currentSlug) {
      this.isEditMode.set(true);
      this.loadProduct();
    }
  }

  loadProduct() {
    if (!this.currentSlug) return;

    this.productsStore.loadProductBySlug(this.currentSlug);

    const checkProduct = setInterval(() => {
      const product = this.productsStore.selectedProduct();
      if (product && !this.productsStore.isLoading()) {
        this.form.patchValue({
          ventureId: product.venture?.id || '',
          name: product.name || '',
          description: product.description || '',
          price: product.price || 0
        });
        clearInterval(checkProduct);
      }
    }, 100);

    setTimeout(() => clearInterval(checkProduct), 5000);
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

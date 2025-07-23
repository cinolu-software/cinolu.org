import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LucideAngularModule, Plus, Edit, Trash, Eye, Activity, Currency } from 'lucide-angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { QueryParams } from '../../../../../utils/types/products/query-params.type';
import { ProductsStore } from '../../../../../data-access/products/products.store';
import { ConfirmationService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { Textarea } from 'primeng/textarea';
import { AddProductStore } from '../../../../../data-access/products/add-product.store';
import { DeleteProductStore } from '../../../../../data-access/products/delete-product.store';
import { UpdateProducttore } from '../../../../../data-access/products/update-product.store';
import { FileUploadComponent } from '../../../../../../../shared/components/file-upload/file-upload.component';
import { ApiImgPipe } from '../../../../../../../shared/pipes/api-img.pipe';
import { IEnterprise, IProduct } from '../../../../../../../shared/models/entities';
import { environment } from '../../../../../../../../environments/environment';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  providers: [ProductsStore, UpdateProducttore, DeleteProductStore, AddProductStore, ConfirmationService],
  imports: [
    ButtonModule,
    InputTextModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    LucideAngularModule,
    ApiImgPipe,
    NgxPaginationModule,
    NgOptimizedImage,
    ConfirmPopupModule,
    Dialog,
    Textarea,
    ReactiveFormsModule,
    FileUploadComponent
  ]
})
export class ProductsComponent implements OnInit {
  enterprise = input.required<IEnterprise>();
  icons = { plus: Plus, edit: Edit, trash: Trash, eye: Eye, activity: Activity, currency: Currency };
  #confirmationService = inject(ConfirmationService);
  #fb = inject(FormBuilder);
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  addProductForm: FormGroup;
  editProductForm: FormGroup;
  productsStore = inject(ProductsStore);
  addProductStore = inject(AddProductStore);
  deleteProductStore = inject(DeleteProductStore);
  updateProductStore = inject(UpdateProducttore);
  showAddModal = signal(false);
  showViewModal = signal(false);
  showEditModal = signal(false);
  product = signal<IProduct | null>(null);
  logoUrl = `${environment.apiUrl}products/add-image/`;
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParams?.['page']) || null
  });

  constructor() {
    this.addProductForm = this.#fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });
    this.editProductForm = this.#fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.productsStore.loadProducts({
      enterpriseId: this.enterprise().id,
      queryParams: this.queryParams()
    });
  }

  patchEditForm(product: IProduct | null): void {
    if (!product) return;
    this.editProductForm.patchValue({
      name: product?.name,
      description: product?.description,
      price: product?.price
    });
  }

  onToggleAddModal(): void {
    this.showAddModal.update((v) => !v);
  }

  onToggleViewModal(product: IProduct | null): void {
    this.product.set(product);
    this.showViewModal.update((v) => !v);
  }

  onToggleEditModal(product: IProduct | null): void {
    this.product.set(product);
    this.patchEditForm(product);
    this.showEditModal.update((v) => !v);
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage;
    this.updateRouteAndProducts();
  }

  updateRoute(): void {
    const { page } = this.queryParams();
    const queryParams = { page, tab: 'products' };
    this.#router.navigate(['profile/enterprises/update', this.enterprise().slug], { queryParams });
  }

  updateRouteAndProducts(): void {
    this.updateRoute();
    this.productsStore.loadProducts({
      enterpriseId: this.enterprise().id,
      queryParams: this.queryParams()
    });
  }

  onAddProduct(): void {
    if (!this.addProductForm.valid) return;
    this.addProductStore.addProduct({
      payload: {
        enterpriseId: this.enterprise().id,
        ...this.addProductForm.value
      },
      onSuccess: () => this.onToggleAddModal()
    });
  }

  onUpdateProduct(): void {
    if (!this.editProductForm.valid) return;
    this.updateProductStore.updateProduct({
      productId: this.product()?.id || '',
      payload: this.editProductForm.value,
      onSuccess: () => this.onToggleEditModal(null)
    });
  }

  onDeleteProduct(productId: string, event: Event): void {
    this.#confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Etes-vous sûr ?',
      rejectButtonProps: {
        label: 'Annuler',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Confirmer',
        severity: 'danger'
      },
      accept: () => {
        this.deleteProductStore.deleteProduct({ enterpriseId: this.enterprise().id, productId });
      }
    });
  }
}

import { Component, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { StepperModule } from 'primeng/stepper';
import { unpaginatedVenturesStore } from '../../../ventures/store/ventures/venture-unpaginated.store';
import { ActivatedRoute } from '@angular/router';
import { ProductStore } from '../../store/products/product.store';
import { UpdateProductStore } from '../../store/products/update-product.store';
import { GalleryStore } from '../../store/galleries/galeries.store';
import { DeleteGalleryStore } from '../../store/galleries/delete-gallery.store';
import { environment } from '../../../../../../../environments/environment';
import { FileUpload } from '../../../../../../shared/components/file-upload/file-upload';
import { ApiImgPipe } from '../../../../../../shared/pipes/api-img.pipe';
import { LucideAngularModule, Trash } from 'lucide-angular';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-product-add',
  providers: [UpdateProductStore, ProductStore, GalleryStore, DeleteGalleryStore, unpaginatedVenturesStore],
  imports: [
    ReactiveFormsModule,
    SelectModule,
    ButtonModule,
    DatePickerModule,
    Textarea,
    InputTextModule,
    StepperModule,
    SelectModule,
    FileUpload,
    ApiImgPipe,
    LucideAngularModule,
    NgOptimizedImage,
  ],
  templateUrl: './edit-product.html',
})
export class EditProductComponent implements OnInit {
  #fb = inject(FormBuilder);
  form: FormGroup;
  venturesStore = inject(unpaginatedVenturesStore);
  productStore = inject(ProductStore);
  store = inject(UpdateProductStore);
  #route = inject(ActivatedRoute);
  #slug = this.#route.snapshot.params['slug'];
  galleryStore = inject(GalleryStore);
  deleteGalleryStore = inject(DeleteGalleryStore);
  galleryUrl = `${environment.apiUrl}galleries/product/`;
  icons = { trash: Trash };

  constructor() {
    this.venturesStore.loadVentures();
    this.form = this.#fb.group({
      slug: ['', Validators.required],
      ventureId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
    });
    effect(() => {
      const product = this.productStore.product();
      if (!product) return;
      this.form.patchValue({
        slug: product.slug,
        name: product.name,
        description: product.description,
        price: product.price,
        ventureId: product.venture.id,
      });
    });
  }

  ngOnInit(): void {
    this.productStore.loadProduct(this.#slug);
    this.galleryStore.loadGallery(this.#slug);
  }

  onEditProduct(): void {
    if (!this.form.valid) return;
    this.store.updateProduct(this.form.value);
  }

  onDeleteImage(imageId: string): void {
    this.deleteGalleryStore.deleteImage(imageId);
  }

  onFileUploadLoaded(): void {
    this.galleryStore.loadGallery(this.#slug);
  }
}

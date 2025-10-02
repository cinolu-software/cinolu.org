import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { VentureStore } from '../../store/ventures/venture.store';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { InputText } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SECTORS } from '../../data/sectors.data';
import { STAGES } from '../../data/stage.data';
import { UpdateVenturetore } from '../../store/ventures/update-venture.store';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { environment } from '../../../../../../../environments/environment';
import { FileUpload } from '../../../../../../shared/components/file-upload/file-upload';
import { QuillEditorComponent } from 'ngx-quill';
import { GalleryStore } from '../../store/galleries/galeries.store';
import { DeleteGalleryStore } from '../../store/galleries/delete-gallery.store';
import { ApiImgPipe } from '../../../../../../shared/pipes/api-img.pipe';
import { LucideAngularModule, Trash } from 'lucide-angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-venture',
  providers: [
    VentureStore,
    UpdateVenturetore,
    GalleryStore,
    DeleteGalleryStore,
  ],
  imports: [
    CommonModule,
    StepperModule,
    ButtonModule,
    InputText,
    TextareaModule,
    SelectModule,
    DatePickerModule,
    FileUpload,
    ReactiveFormsModule,
    QuillEditorComponent,
    ApiImgPipe,
    NgOptimizedImage,
    LucideAngularModule,
  ],
  templateUrl: './edit-venture.html',
})
export class EditVentureComponent implements OnInit {
  #fb = inject(FormBuilder);
  store = inject(VentureStore);

  updateVentureStore = inject(UpdateVenturetore);
  form: FormGroup;
  sectors = SECTORS;
  stages = STAGES;
  logoUrl = `${environment.apiUrl}ventures/add-logo/`;
  coverUrl = `${environment.apiUrl}ventures/add-cover/`;
  galleryUrl = `${environment.apiUrl}galleries/venture/`;
  galleryStore = inject(GalleryStore);
  deleteGalleryStore = inject(DeleteGalleryStore);
  #route = inject(ActivatedRoute);
  icons = { trash: Trash };
  #slug = this.#route.snapshot.params['slug'];

  constructor() {
    effect(() => {
      const venture = this.store.venture();
      if (!venture) return;
      this.form.patchValue({
        ...venture,
        founded_at: new Date(venture.founded_at),
      });
    });
    this.form = this.#fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      problem_solved: ['', Validators.required],
      target_market: ['', Validators.required],
      email: ['', Validators.email],
      phone_number: [''],
      website: [''],
      linkedin_url: [''],
      sector: [''],
      founded_at: [''],
      location: [''],
      stage: [''],
    });
  }

  ngOnInit(): void {
    this.store.loadVenture(this.#slug);
    this.galleryStore.loadGallery(this.#slug);
  }

  onUpdateVenture(): void {
    if (!this.form.valid) return;
    const venture = this.store.venture();
    this.updateVentureStore.updateVenture({
      slug: venture?.slug || '',
      payload: this.form.value,
    });
  }

  onDeleteImage(id: string): void {
    this.deleteGalleryStore.deleteImage(id);
  }

  onFileUploadLoaded(): void {
    this.galleryStore.loadGallery(this.#slug);
  }
}

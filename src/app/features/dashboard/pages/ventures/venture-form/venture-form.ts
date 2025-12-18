import { Component, effect, inject, OnInit, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VenturesStore } from '../../../store/ventures.store';
import { IVenture, IImage } from '@shared/models/entities.models';
import { DatePicker } from 'primeng/datepicker';
import { FileUpload } from '@shared/components/file-upload/file-upload';
import { environment } from '@environments/environment';
import { ApiImgPipe } from '../../../../../shared/pipes/api-img.pipe';
import { VentureGalleryStore } from '@features/dashboard/store/venture-gallery.store';

@Component({
  selector: 'app-venture-form',
  providers: [VentureGalleryStore],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePicker, FileUpload, ApiImgPipe],
  templateUrl: './venture-form.html'
})
export class VentureForm implements OnInit {
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  venturesStore = inject(VenturesStore);

  isEditMode = signal(false);
  currentSlug: string | null = null;
  venture = signal<IVenture | null>(null);
  coverPreview = signal<string | null>(null);
  galleryImages = signal<IImage[]>([]);
  galleryStore = inject(VentureGalleryStore);
  showCoverUpload = signal(true);

  coverUploaded = output<void>();
  galleryUploaded = output<void>();

  sectors = [
    'Agriculture',
    'Technologie',
    'Santé',
    'Éducation',
    'Finance',
    'Commerce',
    'Services',
    'Industrie',
    'Autre'
  ];

  stages = ['Idée', 'Prototype', 'MVP', 'Croissance', 'Expansion', 'Maturité'];

  form = this.fb.group({
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
    stage: ['']
  });

  constructor() {
    effect(() => {
      const selectedVenture = this.venturesStore.selectedVenture();
      if (selectedVenture && this.isEditMode()) {
        this.venture.set(selectedVenture);
        this.form.patchValue(
          {
            name: selectedVenture.name || '',
            description: selectedVenture.description || '',
            problem_solved: selectedVenture.problem_solved || '',
            target_market: selectedVenture.target_market || '',
            email: selectedVenture.email || '',
            phone_number: selectedVenture.phone_number || '',
            website: selectedVenture.website || '',
            linkedin_url: selectedVenture.linkedin_url || '',
            sector: selectedVenture.sector || '',
            founded_at: selectedVenture.founded_at
              ? new Date(selectedVenture.founded_at).toISOString().split('T')[0]
              : '',
            location: selectedVenture.location || '',
            stage: selectedVenture.stage || ''
          },
          { emitEvent: false }
        );

        if (selectedVenture.cover) {
          this.coverPreview.set(selectedVenture.cover);
          this.showCoverUpload.set(false);
        } else {
          this.coverPreview.set(null);
          this.showCoverUpload.set(true);
        }
        if (selectedVenture.gallery && selectedVenture.gallery.length > 0) {
          this.galleryImages.set(selectedVenture.gallery);
        }
      }
    });

    // Sync gallery images with the VentureGalleryStore so updates (delete/upload)
    // are reflected automatically in the form component.
    effect(() => {
      const gallery = this.galleryStore.gallery();
      if (gallery) {
        this.galleryImages.set(gallery);
      }
    });
  }

  ngOnInit() {
    this.currentSlug = this.route.snapshot.paramMap.get('slug');
    if (this.currentSlug) {
      this.isEditMode.set(true);
      this.venturesStore.loadVentureBySlug(this.currentSlug);
      this.galleryStore.loadAll(this.currentSlug);
    }
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formData = this.form.value;

    if (this.isEditMode() && this.currentSlug) {
      this.venturesStore.updateVenture({
        slug: this.currentSlug,
        data: formData as Partial<IVenture>,
        onSuccess: () => this.router.navigate(['/dashboard/ventures'])
      });
    } else {
      this.venturesStore.createVenture({
        data: formData as Partial<IVenture>
      });
    }
  }

  handleCoverLoaded(): void {
    if (this.currentSlug) {
      // Force reload to get the updated cover
      this.venturesStore.loadVentureBySlug(this.currentSlug);
      // Hide upload component immediately
      setTimeout(() => {
        const updatedVenture = this.venturesStore.selectedVenture();
        if (updatedVenture?.cover) {
          this.showCoverUpload.set(false);
        }
      }, 500);
    }
  }

  handleGalleryLoaded(): void {
    if (this.currentSlug) {
      this.venturesStore.loadVentureBySlug(this.currentSlug);
      this.galleryStore.loadAll(this.currentSlug);
    }
  }

  getCoverUploadUrl(): string {
    const ventureId = this.venture()?.id;
    return ventureId ? `${environment.apiUrl}ventures/add-cover/${ventureId}` : '';
  }

  getGalleryUploadUrl(): string {
    const ventureId = this.venture()?.id;
    return ventureId ? `${environment.apiUrl}ventures/gallery/${ventureId}` : '';
  }

  removeCover(): void {
    const ventureId = this.venture()?.id;
    if (ventureId) {
      this.venturesStore.removeCover({
        id: ventureId,
        onSuccess: () => {
          this.coverPreview.set(null);
          this.showCoverUpload.set(true);
          if (this.currentSlug) {
            this.venturesStore.loadVentureBySlug(this.currentSlug);
          }
        }
      });
    }
  }

  removeGalleryImage(imageId: string | number): void {
    // Ensure we pass a string id to the gallery store delete method.
    const id = String(imageId);
    this.galleryStore.delete(id);
  }

  triggerCoverUpload(): void {
    // Remove current cover from server first
    this.removeCover();
  }

  cancel() {
    this.router.navigate(['/dashboard/ventures']);
  }
}

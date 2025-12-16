import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VenturesStore } from '../../../store/ventures.store';
import { IVenture } from '@shared/models/entities.models';
import { DatePicker } from 'primeng/datepicker';

@Component({
  selector: 'app-venture-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DatePicker],
  templateUrl: './venture-form.html'
})
export class VentureForm implements OnInit {
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  venturesStore = inject(VenturesStore);

  isEditMode = signal(false);
  currentSlug: string | null = null;

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
      const venture = this.venturesStore.selectedVenture();
      if (venture && this.isEditMode()) {
        this.form.patchValue(
          {
            name: venture.name || '',
            description: venture.description || '',
            problem_solved: venture.problem_solved || '',
            target_market: venture.target_market || '',
            email: venture.email || '',
            phone_number: venture.phone_number || '',
            website: venture.website || '',
            linkedin_url: venture.linkedin_url || '',
            sector: venture.sector || '',
            founded_at: venture.founded_at ? new Date(venture.founded_at).toISOString().split('T')[0] : '',
            location: venture.location || '',
            stage: venture.stage || ''
          },
          { emitEvent: false }
        );
      }
    });
  }

  ngOnInit() {
    this.currentSlug = this.route.snapshot.paramMap.get('slug');
    if (this.currentSlug) {
      this.isEditMode.set(true);
      this.venturesStore.loadVentureBySlug(this.currentSlug);
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
        data: formData as Partial<IVenture>,
        onSuccess: () => this.router.navigate(['/dashboard/ventures'])
      });
    }
  }
  cancel() {
    this.router.navigate(['/dashboard/ventures']);
  }
}

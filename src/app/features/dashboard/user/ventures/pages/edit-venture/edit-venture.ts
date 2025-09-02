import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import {
  ArrowLeft,
  LucideAngularModule,
  Check,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-angular';
import { VentureStore } from '../../store/venture.store';
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
import { UpdateVenturetore } from '../../store/update-venture.store';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { environment } from '../../../../../../../environments/environment';
import { FileUpload } from '../../../../../../shared/components/file-upload/file-upload';

@Component({
  selector: 'app-edit-venture',
  providers: [VentureStore, UpdateVenturetore],
  imports: [
    LucideAngularModule,
    CommonModule,
    StepperModule,
    ButtonModule,
    InputText,
    TextareaModule,
    SelectModule,
    DatePickerModule,
    FileUpload,
    ReactiveFormsModule,
  ],
  templateUrl: './edit-venture.html',
})
export class EditVentureComponent {
  #fb = inject(FormBuilder);
  icons = {
    back: ArrowLeft,
    next: ChevronsRight,
    previous: ChevronsLeft,
    check: Check,
  };
  store = inject(VentureStore);
  updateVentureStore = inject(UpdateVenturetore);
  form: FormGroup;
  sectors = SECTORS;
  stages = STAGES;
  logoUrl = `${environment.apiUrl}ventures/add-logo/`;
  coverUrl = `${environment.apiUrl}ventures/add-cover/`;

  constructor() {
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
    effect(() => {
      const venture = this.store.venture();
      if (!venture) return;
      this.form.patchValue({
        ...venture,
        founded_at: new Date(venture.founded_at),
      });
    });
  }

  onUpdateVenture(): void {
    if (!this.form.valid) return;
    const venture = this.store.venture();
    this.updateVentureStore.updateVenture({
      slug: venture?.slug || '',
      payload: this.form.value,
    });
  }
}

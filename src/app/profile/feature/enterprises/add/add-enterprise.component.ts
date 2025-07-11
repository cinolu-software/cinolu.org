import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArrowLeft, LucideAngularModule, ChevronsRight, ChevronsLeft, Check } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { AddEnterpriseStore } from '../../../data-access/enterprises/add-enterprise.store';
import { StepperModule } from 'primeng/stepper';
import { SECTORS } from '../../../utils/data/sectors';
import { STAGES } from '../../../utils/data/stage';

@Component({
  selector: 'app-add-enterprise',
  providers: [AddEnterpriseStore],
  imports: [
    ReactiveFormsModule,
    SelectModule,
    ButtonModule,
    DatePickerModule,
    Textarea,
    LucideAngularModule,
    InputTextModule,
    StepperModule
  ],
  templateUrl: './add-enterprise.component.html'
})
export class AddEnterpriseComponent {
  #fb = inject(FormBuilder);
  #location = inject(Location);
  form: FormGroup;
  icons = { back: ArrowLeft, next: ChevronsRight, previous: ChevronsLeft, check: Check };
  sectors = SECTORS;
  stages = STAGES;
  store = inject(AddEnterpriseStore);

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
      stage: ['']
    });
  }

  back(): void {
    this.#location.back();
  }

  onAddEnterprise(): void {
    if (!this.form.valid) return;
    this.store.addEnterprise(this.form.value);
  }
}

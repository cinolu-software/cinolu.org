import { CommonModule } from '@angular/common';
import { Component, effect, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LucideAngularModule, ChevronsRight, ChevronsLeft, Check } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { StepperModule } from 'primeng/stepper';
import { EnterpriseStore } from '../../../store/enterprises/enterprise.store';
import { UpdateEnterprisetore } from '../../../store/enterprises/update-enterprise.store';
import { SECTORS } from '../../../data/sectors.data';
import { STAGES } from '../../../data/stage.data';
import { FileUploadComponent } from '../../../../../../../shared/components/file-upload/file-upload.component';
import { IEnterprise } from '../../../../../../../shared/models/entities';
import { environment } from '../../../../../../../../environments/environment';

@Component({
  selector: 'app-edit-enterprise-info',
  providers: [EnterpriseStore, UpdateEnterprisetore],
  imports: [
    ReactiveFormsModule,
    SelectModule,
    ButtonModule,
    DatePickerModule,
    Textarea,
    LucideAngularModule,
    InputTextModule,
    StepperModule,
    CommonModule,
    FileUploadComponent
  ],
  templateUrl: './edit-info.component.html'
})
export class EditEnterpriseInfoComponent {
  enterprise = input.required<IEnterprise | null>();
  #fb = inject(FormBuilder);
  updateEnterpriseStore = inject(UpdateEnterprisetore);
  form: FormGroup;
  icons = { next: ChevronsRight, previous: ChevronsLeft, check: Check };
  sectors = SECTORS;
  stages = STAGES;
  logoUrl = `${environment.apiUrl}enterprises/add-logo/`;
  coverUrl = `${environment.apiUrl}enterprises/add-cover/`;

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
    effect(() => {
      this.patchForm(this.enterprise());
    });
  }

  patchForm(enterprise: IEnterprise | null): void {
    if (!enterprise) return;
    this.form.patchValue({
      name: enterprise.name,
      description: enterprise.description,
      problem_solved: enterprise.problem_solved,
      target_market: enterprise.target_market,
      email: enterprise.email,
      phone_number: enterprise.phone_number,
      website: enterprise.website,
      linkedin_url: enterprise.linkedin_url,
      sector: enterprise.sector,
      founded_at: new Date(enterprise.founded_at || ''),
      location: enterprise.location,
      stage: enterprise.stage
    });
  }

  onUpdateEnterprise(): void {
    if (!this.form.valid) return;
    this.updateEnterpriseStore.updateEnterprise({
      slug: this.enterprise()?.slug || '',
      payload: this.form.value
    });
  }
}

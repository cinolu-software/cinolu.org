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
import { environment as e } from '../../../../../../environments/environment';
import { EnterpriseStore } from '../../../../data-access/enterprises/enterprise.store';
import { UpdateEnterprisetore } from '../../../../data-access/enterprises/update-enterprise.store';
import { SECTORS } from '../../../../utils/data/sectors';
import { STAGES } from '../../../../utils/data/stage';
import { IEnterprise } from '../../../../../shared/utils/types/models.type';
import { FileUploadComponent } from '../../../../../shared/components/file-upload/file-upload.component';

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
  logoUrl = `${e.apiUrl}enterprises/add-logo/`;
  coverUrl = `${e.apiUrl}enterprises/add-cover/`;

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

import { CommonModule, Location } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArrowLeft, LucideAngularModule, ChevronsRight, ChevronsLeft, Check } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { StepperModule } from 'primeng/stepper';
import { SECTORS } from '../../../utils/data/sectors';
import { STAGES } from '../../../utils/data/stage';
import { Enterprisetore } from '../../../data-access/enterprise.store';
import { UpdateEnterprisetore } from '../../../data-access/update-enterprise.store';
import { FileUploadComponent } from '../../../../shared/ui/file-upload/file-upload.component';
import { environment as e } from '../../../../../environments/environment';

@Component({
  selector: 'app-edit-enterprise',
  providers: [Enterprisetore, UpdateEnterprisetore],
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
  templateUrl: './edit-enterprise.component.html'
})
export class EditEnterpriseComponent {
  #fb = inject(FormBuilder);
  #location = inject(Location);
  form: FormGroup;
  icons = { back: ArrowLeft, next: ChevronsRight, previous: ChevronsLeft, check: Check };
  sectors = SECTORS;
  stages = STAGES;
  enterpriseStore = inject(Enterprisetore);
  updateEnterpriseStore = inject(UpdateEnterprisetore);
  logoUrl = signal<string>('');
  coverUrl = signal<string>('');

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
      const enterprise = this.enterpriseStore.enterprise();
      if (!enterprise) return;
      this.logoUrl.set(`${e.apiUrl}enterprises/add-logo/${enterprise.id}`);
      this.coverUrl.set(`${e.apiUrl}enterprises/add-cover/${enterprise.id}`);
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
    });
  }

  back(): void {
    this.#location.back();
  }

  onUpdateEnterprise(): void {
    if (!this.form.valid) return;
    this.updateEnterpriseStore.updateEnterprise({
      slug: this.enterpriseStore.enterprise()?.slug || '',
      payload: this.form.value
    });
  }
}

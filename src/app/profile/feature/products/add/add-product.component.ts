import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArrowLeft, LucideAngularModule, ChevronsRight, ChevronsLeft, Check } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Textarea } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { DatePickerModule } from 'primeng/datepicker';
import { StepperModule } from 'primeng/stepper';

@Component({
  selector: 'app-add-product',
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
  templateUrl: './add-product.component.html'
})
export class AddProductComponent {
  #fb = inject(FormBuilder);
  #location = inject(Location);
  form: FormGroup;
  icons = { back: ArrowLeft, next: ChevronsRight, previous: ChevronsLeft, check: Check };
  // store = inject(AddEnterpriseStore);

  constructor() {
    this.form = this.#fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required]
    });
  }

  back(): void {
    this.#location.back();
  }

  onAddEnterprise(): void {
    if (!this.form.valid) return;
    // this.store.addEnterprise(this.form.value);
  }
}

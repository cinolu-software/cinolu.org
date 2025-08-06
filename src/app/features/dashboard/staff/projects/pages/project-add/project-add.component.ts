import { Component, inject } from '@angular/core';
import { ArrowLeft, LucideAngularModule, ChevronsRight, ChevronsLeft, Check } from 'lucide-angular';
import { Button } from 'primeng/button';
import { CommonModule, Location } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import { AddProjectStore } from '../../store/projects/add-project.store';
import { TextareaModule } from 'primeng/textarea';
import { UnpaginatedProgramsStore } from '../../../programs/store/unpaginated-programs.store';
import { SelectModule } from 'primeng/select';
import { UnpaginatedCategoriesStore } from '../../store/categories/unpaginated-categories.store';
import { DatePickerModule } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  providers: [AddProjectStore, UnpaginatedProgramsStore, UnpaginatedCategoriesStore],
  imports: [
    LucideAngularModule,
    SelectModule,
    MultiSelectModule,
    TextareaModule,
    StepperModule,
    CommonModule,
    Button,
    InputText,
    DatePickerModule,
    ReactiveFormsModule
  ]
})
export class AddProjectComponent {
  #fb = inject(FormBuilder);
  #location = inject(Location);
  form: FormGroup;
  store = inject(AddProjectStore);
  categoriesStore = inject(UnpaginatedCategoriesStore);
  programsStore = inject(UnpaginatedProgramsStore);
  icons = { back: ArrowLeft, next: ChevronsRight, previous: ChevronsLeft, check: Check };

  constructor() {
    this.form = this.#fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      form_link: ['', Validators.required],
      started_at: [null, Validators.required],
      ended_at: [null, Validators.required],
      program: ['', Validators.required],
      categories: [[], Validators.required]
    });
  }

  onAddProject(): void {
    if (!this.form.valid) return;
    this.store.addProject(this.form.value);
  }

  onGoBack(): void {
    this.#location.back();
  }
}

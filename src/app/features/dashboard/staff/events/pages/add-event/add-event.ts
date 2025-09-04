import { Component, inject } from '@angular/core';
import {
  ArrowLeft,
  LucideAngularModule,
  ChevronsRight,
  ChevronsLeft,
  Check,
} from 'lucide-angular';
import { Button } from 'primeng/button';
import { CommonModule,  } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import { AddEventStore } from '../../store/events/add-event.store';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { UnpaginatedCategoriesStore } from '../../store/categories/unpaginated-categories.store';
import { DatePickerModule } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { UnpaginatedSubprogramsStore } from '../../../programs/store/subprograms/unpaginated-subprograms.store';
import { QuillEditorComponent } from 'ngx-quill';

@Component({
  selector: 'app-event-add',
  templateUrl: './add-event.html',
  providers: [
    AddEventStore,
    UnpaginatedSubprogramsStore,
    UnpaginatedCategoriesStore,
  ],
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
    ReactiveFormsModule,
    QuillEditorComponent,
  ],
})
export class AddEventComponent {
  #fb = inject(FormBuilder);
  form: FormGroup;
  store = inject(AddEventStore);
  categoriesStore = inject(UnpaginatedCategoriesStore);
  programsStore = inject(UnpaginatedSubprogramsStore);
  icons = {
    back: ArrowLeft,
    next: ChevronsRight,
    previous: ChevronsLeft,
    check: Check,
  };

  constructor() {
    this.form = this.#fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      place: ['', Validators.required],
      form_link: [''],
      started_at: [null, Validators.required],
      ended_at: [null, Validators.required],
      program: ['', Validators.required],
      categories: [[], Validators.required],
    });
  }

  onAddEvent(): void {
    if (!this.form.valid) return;
    this.store.addEvent(this.form.value);
  }
}

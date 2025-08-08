import { Component, effect, inject, OnInit } from '@angular/core';
import {
  ArrowLeft,
  LucideAngularModule,
  ChevronsRight,
  ChevronsLeft,
  Check,
} from 'lucide-angular';
import { Button } from 'primeng/button';
import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { StepperModule } from 'primeng/stepper';
import { TextareaModule } from 'primeng/textarea';
import { UnpaginatedProgramsStore } from '../../../programs/store/unpaginated-programs.store';
import { SelectModule } from 'primeng/select';
import { UnpaginatedCategoriesStore } from '../../store/categories/unpaginated-categories.store';
import { DatePickerModule } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { ActivatedRoute } from '@angular/router';
import { UpdateEventStore } from '../../store/events/update-event.store';
import { environment } from '../../../../../../../environments/environment';
import { FileUploadComponent } from '../../../../../../shared/components/file-upload/file-upload.component';
import { ApiImgPipe } from '../../../../../../shared/pipes/api-img.pipe';
import { EventStore } from '../../../../../site/events/store/event.store';
import { EventsStore } from '../../store/events/events.store';

@Component({
  selector: 'app-event-edit',
  templateUrl: './event-edit.component.html',
  providers: [
    EventsStore,
    EventStore,
    UpdateEventStore,
    UnpaginatedProgramsStore,
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
    FileUploadComponent,
    NgOptimizedImage,
    ApiImgPipe,
  ],
})
export class EditEventComponent implements OnInit {
  #fb = inject(FormBuilder);
  #location = inject(Location);
  #route = inject(ActivatedRoute);
  form: FormGroup;
  store = inject(UpdateEventStore);
  categoriesStore = inject(UnpaginatedCategoriesStore);
  programsStore = inject(UnpaginatedProgramsStore);
  eventStore = inject(EventStore);
  url = `${environment.apiUrl}events/cover/`;
  #slug = this.#route.snapshot.params['slug'];
  icons = {
    back: ArrowLeft,
    next: ChevronsRight,
    previous: ChevronsLeft,
    check: Check,
  };

  constructor() {
    this.form = this.#fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      place: ['', Validators.required],
      description: ['', Validators.required],
      form_link: ['', Validators.required],
      started_at: ['', Validators.required],
      ended_at: ['', Validators.required],
      program: ['', Validators.required],
      categories: [[], Validators.required],
    });
    effect(() => {
      const event = this.eventStore.event();
      if (!event) return;
      this.form.patchValue({
        ...event,
        started_at: new Date(event.started_at),
        ended_at: new Date(event.ended_at),
        program: event.program.id,
        categories: event.categories?.map((c) => c.id),
      });
    });
  }

  ngOnInit(): void {
    this.eventStore.loadEvent(this.#slug);
  }

  onUpdateEvent(): void {
    if (!this.form.valid) return;
    this.store.updateEvent(this.form.value);
  }

  onFileUploadLoaded(): void {
    this.eventStore.loadEvent(this.#slug);
  }

  onGoBack(): void {
    this.#location.back();
  }
}

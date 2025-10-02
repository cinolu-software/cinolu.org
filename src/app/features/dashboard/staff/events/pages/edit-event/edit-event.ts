import { Component, effect, inject, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { UnpaginatedCategoriesStore } from '../../store/categories/unpaginated-categories.store';
import { DatePickerModule } from 'primeng/datepicker';
import { MultiSelectModule } from 'primeng/multiselect';
import { ActivatedRoute } from '@angular/router';
import { UpdateEventStore } from '../../store/events/update-event.store';
import { environment } from '../../../../../../../environments/environment';
import { FileUpload } from '../../../../../../shared/components/file-upload/file-upload';
import { ApiImgPipe } from '../../../../../../shared/pipes/api-img.pipe';
import { EventStore } from '../../../../../events/store/event.store';
import { EventsStore } from '../../store/events/events.store';
import { UnpaginatedSubprogramsStore } from '../../../programs/store/subprograms/unpaginated-subprograms.store';
import { QuillEditorComponent } from 'ngx-quill';
import { LucideAngularModule, Trash2 } from 'lucide-angular';
import { GalleryStore } from '../../store/galleries/galeries.store';
import { DeleteGalleryStore } from '../../store/galleries/delete-gallery.store';

@Component({
  selector: 'app-event-edit',
  templateUrl: './edit-event.html',
  providers: [
    EventsStore,
    EventStore,
    GalleryStore,
    DeleteGalleryStore,
    UpdateEventStore,
    UnpaginatedSubprogramsStore,
    UnpaginatedCategoriesStore,
  ],
  imports: [
    SelectModule,
    MultiSelectModule,
    TextareaModule,
    CommonModule,
    Button,
    InputText,
    DatePickerModule,
    ReactiveFormsModule,
    FileUpload,
    NgOptimizedImage,
    ApiImgPipe,
    QuillEditorComponent,
    LucideAngularModule,
  ],
})
export class EditEventComponent implements OnInit {
  #fb = inject(FormBuilder);
  #route = inject(ActivatedRoute);
  form: FormGroup;
  store = inject(UpdateEventStore);
  categoriesStore = inject(UnpaginatedCategoriesStore);
  programsStore = inject(UnpaginatedSubprogramsStore);
  eventStore = inject(EventStore);
  url = `${environment.apiUrl}events/cover/`;
  #slug = this.#route.snapshot.params['slug'];
  icons = { trash: Trash2 };
  galleryUrl = `${environment.apiUrl}galleries/event/`;
  deleteGalleryStore = inject(DeleteGalleryStore);
  galleryStore = inject(GalleryStore);

  constructor() {
    this.form = this.#fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      place: [''],
      description: ['', Validators.required],
      form_link: [''],
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
    this.galleryStore.loadGallery(this.#slug);
  }

  onUpdateEvent(): void {
    if (!this.form.valid) return;
    this.store.updateEvent(this.form.value);
  }

  onDeleteImage(imageId: string): void {
    this.deleteGalleryStore.deleteImage(imageId);
  }

  onFileUploadLoaded(): void {
    this.galleryStore.loadGallery(this.#slug);
  }
}

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
import { UpdateProjectStore } from '../../store/projects/update-project.store';
import { environment } from '../../../../../../../environments/environment';
import { FileUpload } from '../../../../../../shared/components/file-upload/file-upload';
import { ApiImgPipe } from '../../../../../../shared/pipes/api-img.pipe';
import { ProjectStore } from '../../../../../projects/store/project.store';
import { UnpaginatedSubprogramsStore } from '../../../programs/store/subprograms/unpaginated-subprograms.store';
import { QuillEditorComponent } from 'ngx-quill';
import { LucideAngularModule, Trash2 } from 'lucide-angular';
import { GalleryStore } from '../../store/galleries/galeries.store';
import { DeleteGalleryStore } from '../../store/galleries/delete-gallery.store';

@Component({
  selector: 'app-project-edit',
  templateUrl: './edit-project.html',
  providers: [
    GalleryStore,
    DeleteGalleryStore,
    ProjectStore,
    UpdateProjectStore,
    UnpaginatedSubprogramsStore,
    UnpaginatedCategoriesStore,
  ],
  imports: [
    LucideAngularModule,
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
  ],
})
export class EditProjectComponent implements OnInit {
  #fb = inject(FormBuilder);
  #route = inject(ActivatedRoute);
  form: FormGroup;
  store = inject(UpdateProjectStore);
  categoriesStore = inject(UnpaginatedCategoriesStore);
  programsStore = inject(UnpaginatedSubprogramsStore);
  projectStore = inject(ProjectStore);
  url = `${environment.apiUrl}projects/cover/`;
  galleryUrl = `${environment.apiUrl}galleries/project/`;
  #slug = this.#route.snapshot.params['slug'];
  icons = { trash: Trash2 };
  galleryStore = inject(GalleryStore);
  deleteImageStore = inject(DeleteGalleryStore);

  constructor() {
    this.form = this.#fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      form_link: [''],
      started_at: ['', Validators.required],
      ended_at: ['', Validators.required],
      program: ['', Validators.required],
      categories: [[], Validators.required],
    });
    effect(() => {
      const project = this.projectStore.project();
      if (!project) return;
      this.form.patchValue({
        ...project,
        started_at: new Date(project.started_at),
        ended_at: new Date(project.ended_at),
        program: project.program.id,
        categories: project.categories?.map((c) => c.id),
      });
    });
  }

  ngOnInit(): void {
    this.projectStore.loadProject(this.#slug);
    this.galleryStore.loadGallery(this.#slug);
  }

  onDeleteImage(imageId: string | undefined): void {
    if (!imageId) return;
    this.deleteImageStore.deleteImage(imageId);
  }

  onUpdateProject(): void {
    if (!this.form.valid) return;
    this.store.updateProject(this.form.value);
  }

  onFileUploadLoaded(): void {
    this.galleryStore.loadGallery(this.#slug);
  }
}

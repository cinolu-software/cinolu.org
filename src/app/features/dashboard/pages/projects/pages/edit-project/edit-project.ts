import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { Button } from 'primeng/button';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { ChartColumn, FileText, Images, LucideAngularModule, SquarePen, Trash2 } from 'lucide-angular';
import { GalleryStore } from '../../store/galleries/galeries.store';
import { DeleteGalleryStore } from '../../store/galleries/delete-gallery.store';
import { Tabs } from '../../../../../../shared/components/tabs/tabs';
import { ProjectIndicators } from '../../components/project-indicators/project-indicators';
import { ProjectReport } from '../../components/project-report/project-report';

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
    Tabs,
    ProjectIndicators,
    ProjectReport,
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
  galleryUrl = `${environment.apiUrl}projects/gallery/`;
  #slug = this.#route.snapshot.params['slug'];
  icons = { trash: Trash2 };
  galleryStore = inject(GalleryStore);
  deleteImageStore = inject(DeleteGalleryStore);
  tabs = [
    { label: 'Modifier le projet', name: 'edit', icon: SquarePen },
    { label: 'Gérer la galerie', name: 'gallery', icon: Images },
    { label: 'Les indicateurs', name: 'indicators', icon: ChartColumn },
    { label: 'Rapport', name: 'report', icon: FileText },
  ];
  activeTab = signal('edit');

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

  onTabChange(tab: string): void {
    this.activeTab.set(tab);
  }

  onDeleteImage(id: string): void {
    this.deleteImageStore.deleteImage(id);
  }

  onUpdateProject(): void {
    if (!this.form.valid) return;
    this.store.updateProject(this.form.value);
  }

  onCoverUploaded(): void {
    this.projectStore.loadProject(this.#slug);
  }

  onGalleryUploaded(): void {
    this.galleryStore.loadGallery(this.#slug);
  }
}

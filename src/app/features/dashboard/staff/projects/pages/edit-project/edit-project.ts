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
import { UpdateProjectStore } from '../../store/projects/update-project.store';
import { environment } from '../../../../../../../environments/environment';
import { FileUpload } from '../../../../../../shared/components/file-upload/file-upload';
import { ApiImgPipe } from '../../../../../../shared/pipes/api-img.pipe';
import { ProjectStore } from '../../../../../site/projects/store/project.store';

@Component({
  selector: 'app-project-edit',
  templateUrl: './edit-project.html',
  providers: [
    ProjectStore,
    UpdateProjectStore,
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
    FileUpload,
    NgOptimizedImage,
    ApiImgPipe,
  ],
})
export class EditProjectComponent implements OnInit {
  #fb = inject(FormBuilder);
  #location = inject(Location);
  #route = inject(ActivatedRoute);
  form: FormGroup;
  store = inject(UpdateProjectStore);
  categoriesStore = inject(UnpaginatedCategoriesStore);
  programsStore = inject(UnpaginatedProgramsStore);
  projectStore = inject(ProjectStore);
  url = `${environment.apiUrl}projects/cover/`;
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
      description: ['', Validators.required],
      form_link: ['', Validators.required],
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
  }

  onUpdateProject(): void {
    if (!this.form.valid) return;
    this.store.updateProject(this.form.value);
  }

  onFileUploadLoaded(): void {
    this.projectStore.loadProject(this.#slug);
  }

  onGoBack(): void {
    this.#location.back();
  }
}

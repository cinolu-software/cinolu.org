import { CommonModule, NgOptimizedImage } from '@angular/common';
import { OnInit, inject, signal, effect, Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule, Trash2, SquarePen, Images, ChartColumn, FileText } from 'lucide-angular';
import { QuillEditorComponent } from 'ngx-quill';
import { Button } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { InputText } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { TextareaModule } from 'primeng/textarea';
import { environment } from '../../../../../../../environments/environment';
import { FileUpload } from '../../../../../../shared/components/file-upload/file-upload';
import { Tabs } from '../../../../../../shared/components/tabs/tabs';
import { IProject, IIndicator, IMetric, ICategory } from '../../../../../../shared/models/entities.models';
import { ApiImgPipe } from '../../../../../../shared/pipes/api-img.pipe';
import { ProjectStore } from '../../../../../projects/store/project.store';
import { UnpaginatedSubprogramsStore } from '../../../programs/store/subprograms/unpaginated-subprograms.store';
import { ProjectReport } from '../../components/project-report/project-report';
import { UnpaginatedCategoriesStore } from '../../store/categories/unpaginated-categories.store';
import { DeleteGalleryStore } from '../../store/galleries/delete-gallery.store';
import { GalleryStore } from '../../store/galleries/galeries.store';
import { AddMetricStore } from '../../store/projects/add-metric.store';
import { UpdateProjectStore } from '../../store/projects/update-project.store';

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
    AddMetricStore,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LucideAngularModule,
    SelectModule,
    MultiSelectModule,
    TextareaModule,
    Button,
    InputText,
    DatePickerModule,
    FileUpload,
    NgOptimizedImage,
    ApiImgPipe,
    QuillEditorComponent,
    Tabs,
    ProjectReport,
  ],
})
export class EditProjectComponent implements OnInit {
  #fb = inject(FormBuilder);
  #route = inject(ActivatedRoute);
  projectStore = inject(ProjectStore);
  galleryStore = inject(GalleryStore);
  deleteImageStore = inject(DeleteGalleryStore);
  updateProjectStore = inject(UpdateProjectStore);
  categoriesStore = inject(UnpaginatedCategoriesStore);
  programsStore = inject(UnpaginatedSubprogramsStore);
  addMetricsStore = inject(AddMetricStore);
  form: FormGroup;
  #slug = this.#route.snapshot.params['slug'];
  url = `${environment.apiUrl}projects/cover/`;
  galleryUrl = `${environment.apiUrl}projects/gallery/`;
  targeted: Record<string, number | null> = {};
  achieved: Record<string, number | null> = {};
  activeTab = signal('edit');
  icons = { trash: Trash2 };
  tabs = [
    { label: 'Modifier le projet', name: 'edit', icon: SquarePen },
    { label: 'Gérer la galerie', name: 'gallery', icon: Images },
    { label: 'Les indicateurs', name: 'indicators', icon: ChartColumn },
    { label: 'Rapport', name: 'report', icon: FileText },
  ];

  constructor() {
    this.form = this.#initForm();
    this.#watchProjectChanges();
  }

  get totalTargeted(): number | null {
    return Object.values(this.targeted).reduce((sum, val) => (sum || 0) + (val ?? 0), 0);
  }

  get totalAchieved(): number | null {
    return Object.values(this.achieved).reduce((sum, val) => (sum || 0) + (val ?? 0), 0);
  }

  get achievementPercentage(): number {
    const total = this.totalTargeted;
    if (!total || !this.totalAchieved) return 0;
    return Math.round((this.totalAchieved / total) * 100);
  }

  ngOnInit(): void {
    this.projectStore.loadProject(this.#slug);
    this.galleryStore.loadGallery(this.#slug);
  }

  #initForm(): FormGroup {
    return this.#fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      form_link: [''],
      started_at: ['', Validators.required],
      ended_at: ['', Validators.required],
      program: ['', Validators.required],
      categories: [[], Validators.required],
    });
  }

  #watchProjectChanges(): void {
    effect(() => {
      const project = this.projectStore.project();
      if (!project) return;
      this.#initMetrics(project);
      this.#patchForm(project);
    });
  }

  #initMetrics(project: IProject): void {
    const indicators = project.program?.program?.indicators ?? [];
    indicators.forEach((indicator: IIndicator) => {
      const metric = project.metrics.find((m: IMetric) => m?.indicator?.id === indicator?.id);
      this.targeted[indicator.id] = metric?.target ?? null;
      this.achieved[indicator.id] = metric?.achieved ?? null;
    });
  }

  onSaveMetrics(): void {
    const project = this.projectStore.project();
    if (!project) return;
    const metrics = project.program.program.indicators.map((ind: IIndicator) => ({
      indicatorId: ind.id,
      target: this.targeted[ind.id] ?? 0,
      achieved: this.achieved[ind.id] ?? 0,
    }));
    this.addMetricsStore.addMetrics({ id: project.id, metrics });
  }

  #patchForm(project: IProject): void {
    this.form.patchValue({
      ...project,
      started_at: new Date(project.started_at),
      ended_at: new Date(project.ended_at),
      program: project.program.id,
      categories: project.categories?.map((c: ICategory) => c.id),
    });
  }

  onUpdateProject(): void {
    if (this.form.invalid) return;
    this.updateProjectStore.updateProject(this.form.value);
  }

  onCoverUploaded(): void {
    this.projectStore.loadProject(this.#slug);
  }

  onGalleryUploaded(): void {
    this.galleryStore.loadGallery(this.#slug);
  }

  onDeleteImage(id: string): void {
    this.deleteImageStore.deleteImage(id);
  }

  onTabChange(tab: string): void {
    this.activeTab.set(tab);
  }
}

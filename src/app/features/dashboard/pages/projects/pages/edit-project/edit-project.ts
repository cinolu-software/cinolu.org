import { CommonModule, NgOptimizedImage } from '@angular/common';
import { OnInit, inject, signal, effect, Component, computed } from '@angular/core';
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
import { environment } from '@environments/environment';
import { FileUpload, Tabs, MetricsTableComponent } from '@shared/components';
import { IProject } from '@shared/models';
import { ApiImgPipe } from '@shared/pipes';
import {
  MetricsMap,
  initializeMetricsMap,
  metricsMapToDto,
  calculateMetricsTotal,
  calculateAchievementPercentage,
  parseDate,
  extractCategoryIds
} from '@shared/helpers';
import { UnpaginatedSubprogramsStore } from '../../../programs/store/subprograms/unpaginated-subprograms.store';
import { ProjectReport } from '../../components/project-report/project-report';
import { UnpaginatedCategoriesStore } from '../../store/categories/unpaginated-categories.store';
import { DeleteGalleryStore } from '../../store/galleries/delete-gallery.store';
import { GalleryStore } from '../../store/galleries/galeries.store';
import { AddMetricStore } from '../../store/projects/add-metric.store';
import { UpdateProjectStore } from '../../store/projects/update-project.store';
import { IndicatorsStore } from '../../../programs/store/programs/indicators.store';
import { ProjectStore } from '../../store/projects/project.store';

@Component({
  selector: 'app-project-edit',
  templateUrl: './edit-project.html',
  providers: [
    IndicatorsStore,
    GalleryStore,
    DeleteGalleryStore,
    ProjectStore,
    UpdateProjectStore,
    UnpaginatedSubprogramsStore,
    UnpaginatedCategoriesStore,
    AddMetricStore
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
    MetricsTableComponent
  ]
})
export class EditProjectComponent implements OnInit {
  readonly #fb = inject(FormBuilder);
  readonly #route = inject(ActivatedRoute);
  readonly #slug = this.#route.snapshot.params['slug'];
  readonly projectStore = inject(ProjectStore);
  readonly galleryStore = inject(GalleryStore);
  readonly deleteImageStore = inject(DeleteGalleryStore);
  readonly updateProjectStore = inject(UpdateProjectStore);
  readonly categoriesStore = inject(UnpaginatedCategoriesStore);
  readonly programsStore = inject(UnpaginatedSubprogramsStore);
  readonly addMetricsStore = inject(AddMetricStore);
  readonly indicatorsStore = inject(IndicatorsStore);
  form!: FormGroup;
  metricsMap: MetricsMap = {};
  activeTab = signal('edit');
  readonly url = `${environment.apiUrl}projects/cover/`;
  readonly galleryUrl = `${environment.apiUrl}projects/gallery/`;
  readonly icons = { trash: Trash2 };
  readonly tabs = [
    { label: 'Modifier le projet', name: 'edit', icon: SquarePen },
    { label: 'Gérer la galerie', name: 'gallery', icon: Images },
    { label: 'Les indicateurs', name: 'indicators', icon: ChartColumn },
    { label: 'Rapport', name: 'report', icon: FileText }
  ];
  readonly totalTargeted = computed(() => calculateMetricsTotal(this.metricsMap, 'target'));
  readonly totalAchieved = computed(() => calculateMetricsTotal(this.metricsMap, 'achieved'));
  readonly achievementPercentage = computed(() =>
    calculateAchievementPercentage(this.totalTargeted(), this.totalAchieved())
  );

  constructor() {
    this.form = this.#initForm();
    this.#watchProjectChanges();
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
      categories: [[], Validators.required]
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
    const indicators = this.indicatorsStore.indicators();
    this.metricsMap = initializeMetricsMap(indicators, project.metrics);
  }

  onSaveMetrics(): void {
    const project = this.projectStore.project();
    if (!project) return;
    const indicators = this.indicatorsStore.indicators();
    const metrics = metricsMapToDto(this.metricsMap, indicators);
    this.addMetricsStore.addMetrics({ id: project.id, metrics });
  }

  #patchForm(project: IProject): void {
    this.form.patchValue({
      ...project,
      started_at: parseDate(project.started_at),
      ended_at: parseDate(project.ended_at),
      program: project.program.id,
      categories: extractCategoryIds(project.categories)
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

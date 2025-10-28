import { Component, effect, inject, OnInit, signal, computed } from '@angular/core';
import { Button } from 'primeng/button';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { InputText } from 'primeng/inputtext';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { EventsStore } from '../../store/events/events.store';
import { UnpaginatedSubprogramsStore } from '../../../programs/store/subprograms/unpaginated-subprograms.store';
import { QuillEditorComponent } from 'ngx-quill';
import { ChartColumn, FileText, Images, LucideAngularModule, SquarePen, Trash2 } from 'lucide-angular';
import { GalleryStore } from '../../store/galleries/galeries.store';
import { DeleteGalleryStore } from '../../store/galleries/delete-gallery.store';
import { Tabs } from '../../../../../../shared/components/tabs/tabs';
import { EventReport } from '../../components/event-report/event-report';
import { AddMetricStore } from '../../store/events/add-metric.store';
import { IEvent } from '../../../../../../shared/models/entities.models';
import { EventStore } from '../../store/events/event.store';
import { IndicatorsStore } from '../../../programs/store/programs/indicators.store';
import { PerformanceIndicatorComponent } from '../../../../../../shared/components/performance-indicator/performance-indicator';
import { MetricsTableComponent } from '../../../../../../shared/components/metrics-table/metrics-table';
import {
  MetricsMap,
  initializeMetricsMap,
  metricsMapToDto,
  calculateMetricsTotal,
  calculateAchievementPercentage
} from '../../../../../../shared/helpers/metrics.helper';
import { parseDate, extractCategoryIds } from '../../../../../../shared/helpers/form.helper';

@Component({
  selector: 'app-event-edit',
  templateUrl: './edit-event.html',
  providers: [
    IndicatorsStore,
    EventsStore,
    EventStore,
    GalleryStore,
    DeleteGalleryStore,
    UpdateEventStore,
    UnpaginatedSubprogramsStore,
    UnpaginatedCategoriesStore,
    AddMetricStore
  ],
  imports: [
    SelectModule,
    MultiSelectModule,
    TextareaModule,
    CommonModule,
    FormsModule,
    Button,
    InputText,
    DatePickerModule,
    ReactiveFormsModule,
    FileUpload,
    NgOptimizedImage,
    ApiImgPipe,
    QuillEditorComponent,
    LucideAngularModule,
    Tabs,
    EventReport,
    PerformanceIndicatorComponent,
    MetricsTableComponent
  ]
})
export class EditEventComponent implements OnInit {
  readonly #fb = inject(FormBuilder);
  readonly #route = inject(ActivatedRoute);
  readonly #slug = this.#route.snapshot.params['slug'];

  // Stores
  readonly store = inject(UpdateEventStore);
  readonly categoriesStore = inject(UnpaginatedCategoriesStore);
  readonly programsStore = inject(UnpaginatedSubprogramsStore);
  readonly eventStore = inject(EventStore);
  readonly indicatorsStore = inject(IndicatorsStore);
  readonly deleteGalleryStore = inject(DeleteGalleryStore);
  readonly galleryStore = inject(GalleryStore);
  readonly addMetricsStore = inject(AddMetricStore);

  // Form and state
  form!: FormGroup;
  metricsMap: MetricsMap = {};
  activeTab = signal('edit');

  // Constants
  readonly url = `${environment.apiUrl}events/cover/`;
  readonly galleryUrl = `${environment.apiUrl}events/gallery/`;
  readonly icons = { trash: Trash2 };
  readonly tabs = [
    { label: "Modifier l'événement", name: 'edit', icon: SquarePen },
    { label: 'Gérer la galerie', name: 'gallery', icon: Images },
    { label: 'Les indicateurs', name: 'indicators', icon: ChartColumn },
    { label: 'Rapport', name: 'report', icon: FileText }
  ];

  // Computed metrics
  readonly totalTargeted = computed(() => calculateMetricsTotal(this.metricsMap, 'target'));
  readonly totalAchieved = computed(() => calculateMetricsTotal(this.metricsMap, 'achieved'));
  readonly achievementPercentage = computed(() =>
    calculateAchievementPercentage(this.totalTargeted(), this.totalAchieved())
  );

  constructor() {
    this.form = this.#initForm();
    this.#watchEventChanges();
  }

  ngOnInit(): void {
    this.eventStore.loadEvent(this.#slug);
    this.galleryStore.loadGallery(this.#slug);
  }

  #initForm(): FormGroup {
    return this.#fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      place: [''],
      description: ['', Validators.required],
      form_link: [''],
      started_at: ['', Validators.required],
      ended_at: ['', Validators.required],
      program: ['', Validators.required],
      categories: [[], Validators.required]
    });
  }

  #patchForm(event: IEvent): void {
    this.form.patchValue({
      ...event,
      started_at: parseDate(event.started_at),
      ended_at: parseDate(event.ended_at),
      program: event.program.id,
      categories: extractCategoryIds(event.categories)
    });
  }

  #watchEventChanges(): void {
    effect(
      () => {
        const event = this.eventStore.event();
        if (!event) return;
        this.#patchForm(event);
        this.#initMetrics(event);
      },
      { allowSignalWrites: true }
    );
  }

  #initMetrics(event: IEvent): void {
    const indicators = this.indicatorsStore.indicators();
    this.metricsMap = initializeMetricsMap(indicators, event.metrics);
  }

  onTabChange(tab: string): void {
    this.activeTab.set(tab);
  }

  onUpdateEvent(): void {
    if (!this.form.valid) return;
    this.store.updateEvent(this.form.value);
  }

  onDeleteImage(imageId: string): void {
    this.deleteGalleryStore.deleteImage(imageId);
  }

  onCoverUploaded(): void {
    this.eventStore.loadEvent(this.#slug);
  }

  onGalleryUploaded(): void {
    this.galleryStore.loadGallery(this.#slug);
  }

  onSaveMetrics(): void {
    const event = this.eventStore.event();
    if (!event) return;
    const indicators = this.indicatorsStore.indicators();
    const metrics = metricsMapToDto(this.metricsMap, indicators);
    this.addMetricsStore.addMetrics({ id: event.id, metrics });
  }
}

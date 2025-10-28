import { Component, effect, inject, OnInit, signal } from '@angular/core';
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
import { ICategory, IEvent, IIndicator, IMetric } from '../../../../../../shared/models/entities.models';
import { EventStore } from '../../store/events/event.store';
import { IndicatorsStore } from '../../../programs/store/programs/indicators.store';

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
    EventReport
  ]
})
export class EditEventComponent implements OnInit {
  #fb = inject(FormBuilder);
  #route = inject(ActivatedRoute);
  form: FormGroup;
  store = inject(UpdateEventStore);
  categoriesStore = inject(UnpaginatedCategoriesStore);
  programsStore = inject(UnpaginatedSubprogramsStore);
  eventStore = inject(EventStore);
  indicatorsStore = inject(IndicatorsStore);
  url = `${environment.apiUrl}events/cover/`;
  #slug = this.#route.snapshot.params['slug'];
  icons = { trash: Trash2 };
  galleryUrl = `${environment.apiUrl}events/gallery/`;
  deleteGalleryStore = inject(DeleteGalleryStore);
  galleryStore = inject(GalleryStore);
  addMetricsStore = inject(AddMetricStore);
  targeted: Record<string, number | null> = {};
  achieved: Record<string, number | null> = {};
  tabs = [
    { label: "Modifier l'événement", name: 'edit', icon: SquarePen },
    { label: 'Gérer la galerie', name: 'gallery', icon: Images },
    { label: 'Les indicateurs', name: 'indicators', icon: ChartColumn },
    { label: 'Rapport', name: 'report', icon: FileText }
  ];
  activeTab = signal('edit');

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
      started_at: new Date(event.started_at),
      ended_at: new Date(event.ended_at),
      program: event.program.id,
      categories: event.categories?.map((c: ICategory) => c.id)
    });
  }

  #watchEventChanges(): void {
    effect(() => {
      const event = this.eventStore.event();
      if (!event) return;
      this.#patchForm(event);
      this.#initMetrics(event);
    });
  }

  #initMetrics(event: IEvent): void {
    const indicators = this.indicatorsStore.indicators();
    indicators.forEach((indicator: IIndicator) => {
      const metric = event.metrics.find((m: IMetric) => m?.indicator?.id === indicator?.id);
      this.targeted[indicator.id] = metric?.target ?? null;
      this.achieved[indicator.id] = metric?.achieved ?? null;
    });
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
    const metrics = indicators.map((ind: IIndicator) => ({
      indicatorId: ind.id,
      target: this.targeted[ind.id] ?? 0,
      achieved: this.achieved[ind.id] ?? 0
    }));
    this.addMetricsStore.addMetrics({ id: event.id, metrics });
  }
}

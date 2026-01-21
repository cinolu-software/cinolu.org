import { CommonModule } from '@angular/common';
import { effect, computed } from '@angular/core';
import { Component, inject, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { ProjectSkeleton } from '../../components/project-skeleton/project-skeleton';
import {
  LucideAngularModule,
  X,
  FileText,
  NotepadText,
  CalendarDays,
  CalendarCheck,
  MapPin,
  Tag,
  ArrowRight,
  FileLock2,
  CalendarSync,
  CalendarX,
  MapPinHouse,
  Share2,
  ChevronUp,
  Target,
  Info,
  Hourglass,
  CheckCircle2,
  UserCog,
  Users,
  Eye,
  SquaresSubtract,
  ExternalLink
} from 'lucide-angular';
import { ProjectStore } from '../../store/project.store';
import { formatDateForGoogleCalendarUTC, openExternalUrl } from '@shared/helpers';
import { ActivatedRoute } from '@angular/router';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { IForm, IFormField, IProject, IResource, PhaseFormFieldType } from '../../../../shared/models/entities.models';
import { GalleriaModule } from 'primeng/galleria';
import { carouselConfig } from '../../../landing/config/carousel.config';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectPhasesStore } from '@features/projects/store/project-phases.store';
import { ProjectResourcesStore } from '@features/projects/store/project-resources.store';
import { ProjectFormsStore } from '@features/projects/store/project-forms.store';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { SubscriptionStore } from '@features/projects/store/subscription.store';
import { AuthStore } from '@core/auth';
import { ToastrService } from '@core/services/toast/toastr.service';
import { environment } from '@environments/environment';

type FieldFormGroup = FormGroup<{
  id: FormControl<string>;
  label: FormControl<string>;
  type: FormControl<PhaseFormFieldType>;
  required: FormControl<boolean>;
  placeholder: FormControl<string | null>;
  helperText: FormControl<string | null>;
  description: FormControl<string | null>;
  options: FormArray<FormGroup<{ label: FormControl<string>; value: FormControl<string> }>>;
}>;

type PreviewFormGroup = FormGroup<Record<string, FormControl<unknown>>>;

@Component({
  selector: 'app-project-detail',
  providers: [ProjectStore, ProjectPhasesStore, SubscriptionStore, ProjectResourcesStore, ProjectFormsStore],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApiImgPipe,
    ProjectSkeleton,
    LucideAngularModule,
    GalleriaModule,
    TranslateModule,
    InputTextModule,
    Button,
    DialogModule
  ],
  templateUrl: './detail-project.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailProject implements OnInit {
  #sanitizer = inject(DomSanitizer);
  http = inject(HttpClient);
  #route = inject(ActivatedRoute);
  store = inject(ProjectStore);
  phasesStore = inject(ProjectPhasesStore);
  resourcesStore = inject(ProjectResourcesStore);
  formsStore = inject(ProjectFormsStore);
  user = inject(AuthStore);
  subscriptionStore = inject(SubscriptionStore);
  toast = inject(ToastrService);
  #fb = inject(FormBuilder);

  showFormDialog = signal(false);
  selectedForm = signal<IForm | null>(null);
  selectedFormGroup = signal<PreviewFormGroup | null>(null);

  // Active section: 'description' | 'criteria' | 'objectives' | 'context' | null
  activeSection = signal<string | null>(null);

  expandedDescription = computed(() => this.activeSection() === 'description');
  expandedCriteria = computed(() => this.activeSection() === 'criteria');
  expandedObjectives = computed(() => this.activeSection() === 'objectives');
  expandedContext = computed(() => this.activeSection() === 'context');

  showEditModal = signal(false);
  expandedResources = signal<Record<string, boolean>>({});
  // Dialog de ressources (Option A)
  showResourcesDialog = signal(false);
  selectedResourcesPhaseId = signal<string | null>(null);

  toggleExpandedResources(phaseId: string) {
    const next = !this.expandedResources()[phaseId];
    this.expandedResources.update((state) => ({
      ...state,
      [phaseId]: next
    }));

    if (next) {
      this.resourcesStore.loadResourcesByPhase(phaseId);
      const existingForms = this.formsStore.forms()[phaseId];
      if (!existingForms || existingForms.length === 0) {
        this.formsStore.loadFormsByPhase(phaseId);
      }
    }
  }

  isResourcesExpanded(phaseId: string): boolean {
    return !!this.expandedResources()[phaseId];
  }

  phases = this.phasesStore.phases;
  phasesLoading = this.phasesStore.isLoading;
  resources = this.resourcesStore.resources;
  resourcesLoading = this.resourcesStore.isLoading;
  previewSubmitted = signal<string | null>(null);
  previewFormGroups = new Map<string, PreviewFormGroup>();

  // Computed signals pour remplacer les appels de fonctions
  projectStatus = computed(() => {
    const project = this.store.project();
    if (!project) return null;

    const now = new Date();
    const startedAt = new Date(project.started_at);
    const endedAt = new Date(project.ended_at);

    if (startedAt <= now && endedAt >= now) {
      return 'En cours';
    } else if (startedAt > now) {
      return 'À venir';
    } else {
      return 'Terminé';
    }
  });

  statusBadgeClasses = computed(() => {
    const statut = this.projectStatus();
    switch (statut) {
      case 'En cours':
        return 'bg-primary-50 border-primary-200 text-primary-700';
      case 'À venir':
        return 'bg-amber-50 border-amber-200 text-amber-700';
      case 'Terminé':
        return 'bg-blue-50 border-blue-200 text-blue-700';
      default:
        return 'bg-gray-100 border-gray-200 text-gray-700';
    }
  });

  formForm = this.#fb.group({
    /* ... */
  });

  openFormDialog(form: IForm) {
    this.selectedForm.set(form);
    this.selectedFormGroup.set(this.getPreviewFormGroup(form));
    this.showFormDialog.set(true);
  }

  closeFormDialog() {
    this.showFormDialog.set(false);
    this.selectedForm.set(null);
    this.selectedFormGroup.set(null);
    this.previewSubmitted.set(null);
  }

  openFormForPhase(phaseId: string) {
    const forms = this.getFormsForPhase(phaseId);
    if (forms && forms.length > 0) {
      this.openFormDialog(forms[0]);
    }
  }

  private toggleSection(name: string) {
    this.activeSection.set(this.activeSection() === name ? null : name);
  }

  toggleDescription() {
    this.toggleSection('description');
  }

  toggleCriteria() {
    this.toggleSection('criteria');
  }

  toggleObjectives() {
    this.toggleSection('objectives');
  }

  toggleContext() {
    this.toggleSection('context');
  }

  onToggleEditModal(phaseId: string): IResource[] {
    this.showEditModal.set(true);
    return this.resources().filter((r: IResource) => r.phase?.id === phaseId);
  }

  closeModal(): void {
    this.showEditModal.set(false);
  }

  renderSafeHtml(html: string | undefined | null): SafeHtml {
    return this.#sanitizer.bypassSecurityTrustHtml(html || '');
  }

  getResourcesForPhase(phaseId: string): IResource[] {
    return this.resources().filter((r: IResource) => r.phase?.id === phaseId);
  }

  icons = {
    fileText: FileText,
    notepadText: NotepadText,
    calendarDays: CalendarDays,
    calendarCheck: CalendarCheck,
    mapPin: MapPin,
    tag: Tag,
    arrow: ArrowRight,
    fileLock: FileLock2,
    calendarSync: CalendarSync,
    calendarX: CalendarX,
    map: MapPinHouse,
    share: Share2,
    chevronUp: ChevronUp,
    target: Target,
    info: Info,
    hourglass: Hourglass,
    checkCircle2: CheckCircle2,
    userCog: UserCog,
    users: Users,
    success: CheckCircle2,
    eye: Eye,
    x: X,
    squaresSubtract: SquaresSubtract,
    external: ExternalLink
  };

  getFormsForPhase(phaseId: string): IForm[] {
    return this.formsStore.forms()[phaseId] || [];
  }

  // Helpers for resources/forms displayed in the resources dialog
  selectedResources(): IResource[] {
    const id = this.selectedResourcesPhaseId();
    return id ? this.getResourcesForPhase(id) : [];
  }

  selectedForms(): IForm[] {
    const id = this.selectedResourcesPhaseId();
    return id ? this.getFormsForPhase(id) : [];
  }

  responsiveOptions = carouselConfig;
  ngOnInit(): void {
    const slug = this.#route.snapshot.params['slug'];
    this.store.loadProject(slug);
  }

  get fieldsArray(): FormArray<FieldFormGroup> | undefined {
    const control = this.formForm.get('fields');
    return control instanceof FormArray ? (control as FormArray<FieldFormGroup>) : undefined;
  }

  private _projectEffect = effect(() => {
    const project = this.store.project();
    if (project && project.id) {
      this.phasesStore.loadPhasesByProject(project.id);
      this.resourcesStore.loadResourcesByProject(project.id);
    }
  });

  private _phasesEffect = effect(() => {
    const phases = this.phases();
    if (phases && phases.length > 0) {
      phases.forEach((phase) => {
        if (phase.id) {
          this.formsStore.loadFormsByPhase(phase.id);
        }
      });
    }
  });

  private _formsEffect = effect(() => {
    const formsByPhase = this.formsStore.forms();
    const groups = new Map<string, PreviewFormGroup>();
    Object.values(formsByPhase).forEach((forms) => {
      forms.forEach((form) => {
        groups.set(form.id, this.createPreviewFormGroup(form));
      });
    });
    this.previewFormGroups = groups;
    this.previewSubmitted.set(null);
  });

  getStatut(project: IProject): string {
    const now = new Date();
    const startedAt = new Date(project.started_at);
    const endedAt = new Date(project.ended_at);
    if (startedAt <= now && endedAt >= now) {
      return 'En cours';
    } else if (startedAt > now) {
      return 'À venir';
    } else {
      return 'Terminé';
    }
  }

  getStatusBadgeClasses(project: IProject | null | undefined): string {
    if (!project) return 'bg-gray-100 border-gray-200 text-gray-700';
    const statut = this.getStatut(project);
    switch (statut) {
      case 'En cours':
        return 'bg-primary-50 border-primary-200 text-primary-700';

      case 'À venir':
        return 'bg-amber-50 border-amber-200 text-amber-700';

      case 'Terminé':
        return 'bg-blue-50 border-blue-200 text-blue-700';

      default:
        return 'bg-gray-100 border-gray-200 text-gray-700';
    }
  }

  openLink(url?: string): void {
    openExternalUrl(url);
  }

  addToCalendar() {
    const project = this.store.project();
    if (!project) return;
    const start = formatDateForGoogleCalendarUTC(project.started_at);
    const end = formatDateForGoogleCalendarUTC(project.ended_at);
    const title = encodeURIComponent(project.name || 'Project');
    const details = encodeURIComponent(project.description?.replace(/\n/g, ' ') || '');
    const url = `https://calendar.google.com/calendar/r/eventedit?text=${title}&details=${details}&dates=${start}/${end}`;
    openExternalUrl(url);
  }

  async shareProject() {
    const project = this.store.project();
    if (!project) return;
    interface LocalShareData {
      title?: string;
      text?: string;
      url?: string;
    }

    const shareData: LocalShareData = {
      title: project.name,
      text: (project.description || '').slice(0, 200),
      url: typeof window !== 'undefined' ? window.location.href : ''
    };

    try {
      const nav = navigator as unknown as { share?: (data: LocalShareData) => Promise<void> };
      if (nav.share) {
        await nav.share(shareData);
      } else if (typeof window !== 'undefined') {
        const body = encodeURIComponent(`${shareData.text}\n\n${shareData.url}`);
        window.open(`mailto:?subject=${encodeURIComponent(shareData.title || '')}&body=${body}`, '_blank');
      }
    } catch {
      // ignore (user cancelled or not supported)
    }
  }

  getResourceUrl(resource: IResource): string {
    if (resource.url.startsWith('http')) return resource.url;
    return `${environment.apiUrl}uploads/projects/resources/${resource.url}`;
  }

  #multiValueTypes = new Set<PhaseFormFieldType>([
    'MULTI_SELECT',
    'multiselect',
    'multi_select',
    'CHECKBOX',
    'checkbox'
  ]);

  isMultiValueField(type: PhaseFormFieldType): boolean {
    return this.#multiValueTypes.has(type);
  }
  private createPreviewControl(field: IFormField): FormControl<unknown> {
    const validators = field.required ? [Validators.required] : [];
    if (this.isMultiValueField(field.type)) {
      return this.#fb.control<string[]>([], validators);
    }
    if (field.type === 'FILE_UPLOAD' || field.type === 'file' || field.type === 'file_upload') {
      return this.#fb.control<File | null>(null, validators);
    }
    return this.#fb.control('', validators);
  }

  private createPreviewFormGroup(form: IForm): PreviewFormGroup {
    const controls: Record<string, FormControl<unknown>> = {};
    form.fields.forEach((field) => {
      controls[field.id] = this.createPreviewControl(field);
    });
    return this.#fb.group(controls);
  }

  getPreviewFormGroup(form: IForm): PreviewFormGroup {
    const existing = this.previewFormGroups.get(form.id);
    if (existing) {
      return existing;
    }
    const newGroup = this.createPreviewFormGroup(form);
    this.previewFormGroups.set(form.id, newGroup);
    return newGroup;
  }

  onSubmitPreview(form: IForm): void {
    const previewGroup = this.previewFormGroups.get(form.id) ?? this.getPreviewFormGroup(form);
    if (!previewGroup) return;
    if (previewGroup.invalid) {
      form.fields.forEach((field) => previewGroup.get(field.id)?.markAsTouched());
      return;
    }

    if (!this.user.user()) {
      this.toast.showError('Vous devez être connecté pour soumettre le formulaire');
      return;
    }

    const submissionByLabel: Record<string, unknown> = {};
    form.fields.forEach((field) => {
      const control = previewGroup.get(field.id);
      const value = control?.value;
      const key = (field.label && field.label.trim()) || field.id;

      if (value instanceof File) {
        submissionByLabel[key] = {
          __file: true,
          name: value.name,
          size: value.size,
          type: value.type
        };
      } else if (Array.isArray(value)) {
        submissionByLabel[key] = [...value];
      } else {
        submissionByLabel[key] = value;
      }
    });

    try {
      this.subscriptionStore.submitForm({
        formId: form.id,
        responses: [submissionByLabel]
      });
    } catch {
      // console.error("Erreur lors de l'appel à subscriptionStore.submitForm", e);
    }

    this.previewSubmitted.set(form.id);
    this.showFormDialog.set(false);
  }

  normalizeType(type: PhaseFormFieldType): string {
    return (type || 'SHORT_TEXT').toString().toUpperCase();
  }

  isPreviewSubmitted(formId: string): boolean {
    return this.previewSubmitted() === formId;
  }

  getFieldArrayValue(previewGroup: PreviewFormGroup, fieldId: string): string[] {
    const value = previewGroup.get(fieldId)?.value;
    return Array.isArray(value) ? (value as string[]) : [];
  }

  onToggleCheckboxValue(previewGroup: PreviewFormGroup, fieldId: string, optionValue: string, checked: boolean): void {
    const control = previewGroup.get(fieldId);
    if (!control) return;
    const currentValue = (control.value as string[]) || [];
    if (checked) {
      control.setValue([...currentValue, optionValue]);
    } else {
      control.setValue(currentValue.filter((val) => val !== optionValue));
    }
  }

  showResourcesByPhase: Record<string, boolean> = {};

  toggleResources(phaseId: string) {
    this.showResourcesByPhase[phaseId] = !this.showResourcesByPhase[phaseId];
  }

  openResourcesDialog(phaseId: string) {
    this.selectedResourcesPhaseId.set(phaseId);
    // Charger les ressources et formulaires pour la phase
    this.resourcesStore.loadResourcesByPhase(phaseId);
    const existingForms = this.formsStore.forms()[phaseId];
    if (!existingForms || existingForms.length === 0) {
      this.formsStore.loadFormsByPhase(phaseId);
    }
    this.showResourcesDialog.set(true);
  }

  closeResourcesDialog() {
    this.showResourcesDialog.set(false);
    this.selectedResourcesPhaseId.set(null);
  }
}

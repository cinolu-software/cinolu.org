import { CommonModule } from '@angular/common';
import { effect } from '@angular/core';
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
  ArrowLeft,
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
  Users
} from 'lucide-angular';
import { ProjectStore } from '../../store/project.store';
import { ActivatedRoute } from '@angular/router';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { IForm, IFormField, IProject, IResource, PhaseFormFieldType } from '../../../../shared/models/entities.models';
import { GalleriaModule } from 'primeng/galleria';
import { carouselConfig } from '../../../landing/config/carousel.config';
import { TranslateModule } from '@ngx-translate/core';
import { ProjectPhasesStore } from '@features/projects/store/project-phases.store';
import { ProjectResourcesStore } from '@features/projects/store/project-resources.store';
import { ProjectFormsStore } from '@features/projects/store/project-forms.store';
import { Textarea } from 'primeng/textarea';
import { InputTextModule } from 'primeng/inputtext';
import { Button } from 'primeng/button';

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
  providers: [ProjectStore, ProjectPhasesStore, ProjectResourcesStore, ProjectFormsStore],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApiImgPipe,
    ProjectSkeleton,
    LucideAngularModule,
    GalleriaModule,
    TranslateModule,
    Textarea,
    InputTextModule,
    Button
  ],
  templateUrl: './detail-project.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DetailProject implements OnInit {
  #route = inject(ActivatedRoute);
  store = inject(ProjectStore);
  phasesStore = inject(ProjectPhasesStore);
  resourcesStore = inject(ProjectResourcesStore);
  formsStore = inject(ProjectFormsStore);

  expandedDescription = signal(false);
  #fb = inject(FormBuilder);
  phases = this.phasesStore.phases;
  phasesLoading = this.phasesStore.isLoading;
  resources = this.resourcesStore.resources;
  resourcesLoading = this.resourcesStore.isLoading;
  // previewingForm = signal<IForm | null>(null);
  previewSubmitted = signal<string | null>(null);
  previewFormGroups = new Map<string, PreviewFormGroup>();

  formForm = this.#fb.group({
    title: ['', Validators.required],
    description: [''],
    welcome_message: [''],
    is_active: [true],
    settings: this.#fb.group({
      allowMultipleSubmissions: [false],
      confirmationMessage: [''],
      submissionNote: ['']
    }),
    fields: this.#fb.array<FieldFormGroup>([])
  });

  getResourcesForPhase(phaseId: string): IResource[] {
    return this.resources().filter((r: IResource) => r.phase?.id === phaseId);
  }

  icons = {
    moveLeft: ArrowLeft,
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
    success: CheckCircle2
  };
  getFormsForPhase(phaseId: string): IForm[] {
    return this.formsStore.forms()[phaseId] || [];
  }

  toggleDescription() {
    this.expandedDescription.update((v) => !v);
  }

  responsiveOptions = carouselConfig;
  ngOnInit(): void {
    const slug = this.#route.snapshot.params['slug'];
    this.store.loadProject(slug);
  }

  get fieldsArray(): FormArray<FieldFormGroup> {
    return this.formForm.get('fields') as FormArray<FieldFormGroup>;
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
    if (statut === 'En cours') return 'bg-green-50 border-green-100 text-green-700';
    if (statut === 'À venir') return 'bg-amber-50 border-amber-100 text-amber-700';
    return 'bg-gray-100 border-gray-200 text-gray-700';
  }

  openLink(url?: string): void {
    if (!url) return;
    if (typeof window === 'undefined') return;
    window.open(url, '_blank');
  }

  private formatDateForCalendar(d: string | Date) {
    const dt = new Date(d);
    const yyyy = dt.getUTCFullYear().toString().padStart(4, '0');
    const mm = (dt.getUTCMonth() + 1).toString().padStart(2, '0');
    const dd = dt.getUTCDate().toString().padStart(2, '0');
    const hh = dt.getUTCHours().toString().padStart(2, '0');
    const min = dt.getUTCMinutes().toString().padStart(2, '0');
    const ss = dt.getUTCSeconds().toString().padStart(2, '0');
    return `${yyyy}${mm}${dd}T${hh}${min}${ss}Z`;
  }

  addToCalendar() {
    const project = this.store.project();
    if (!project) return;
    const start = this.formatDateForCalendar(project.started_at);
    const end = this.formatDateForCalendar(project.ended_at);
    const title = encodeURIComponent(project.name || 'Project');
    const details = encodeURIComponent(project.description?.replace(/\n/g, ' ') || '');
    const url = `https://calendar.google.com/calendar/r/eventedit?text=${title}&details=${details}&dates=${start}/${end}`;
    if (typeof window === 'undefined') return;
    window.open(url, '_blank');
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
    this.previewSubmitted.set(form.id);
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

  onToggleCheckboxValue(formId: string, fieldId: string, optionValue: string, checked: boolean): void {
    const control = this.previewFormGroups.get(formId)?.get(fieldId);
    if (!control) return;
    const currentValue = (control.value as string[]) || [];
    if (checked) {
      control.setValue([...currentValue, optionValue]);
    } else {
      control.setValue(currentValue.filter((val) => val !== optionValue));
    }
  }
}

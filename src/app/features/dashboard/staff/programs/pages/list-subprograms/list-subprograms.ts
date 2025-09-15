import { Component, inject, OnInit, signal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {
  LucideAngularModule,
  RefreshCcw,
  SquarePen,
  Trash,
  Plus,
  Search,
  Eye,
  EyeOff,
  Star,
  StarOff,
} from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { NgxPaginationModule } from 'ngx-pagination';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { SubprogramsStore } from '../../store/subprograms/subprograms.store';
import { FilterSubprogramsDto } from '../../dto/subprograms/filter-subprograms.dto';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { AddSubprogramsStore } from '../../store/subprograms/add-subprograms.store';
import { Textarea } from 'primeng/textarea';
import { UpdateSubprogramsStore } from '../../store/subprograms/update-subprograms.store';
import { DeleteSubprogramsStore } from '../../store/subprograms/delete-subprograms.store';
import { ISubprogram } from '../../../../../../shared/models/entities.models';
import { FileUpload } from '../../../../../../shared/components/file-upload/file-upload';
import { environment } from '../../../../../../../environments/environment';
import { ApiImgPipe } from '../../../../../../shared/pipes/api-img.pipe';
import { AvatarModule } from 'primeng/avatar';
import { PublishSubprogramsStore } from '../../store/subprograms/publish-subprograms.store';
import { UnpaginatedProgramsStore } from '../../store/list-programs/unpaginated-programs.store';
import { SelectModule } from 'primeng/select';
import { HighlightSubprogramStore } from '../../store/subprograms/highlight-subprogram.store';

@Component({
  selector: 'app-list-subprograms',
  templateUrl: './list-subprograms.html',
  providers: [
    UnpaginatedProgramsStore,
    SubprogramsStore,
    DeleteSubprogramsStore,
    UpdateSubprogramsStore,
    AddSubprogramsStore,
    ConfirmationService,
    PublishSubprogramsStore,
    HighlightSubprogramStore,
  ],
  imports: [
    LucideAngularModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    ConfirmPopup,
    Dialog,
    Textarea,
    FileUpload,
    ApiImgPipe,
    AvatarModule,
    SelectModule,
  ],
})
export class ListSubprograms implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  #confirmationService = inject(ConfirmationService);
  searchForm: FormGroup;
  addSubprogramForm: FormGroup;
  updateSubprogramForm: FormGroup;
  store = inject(SubprogramsStore);
  programsStore = inject(UnpaginatedProgramsStore);
  addSubprogramStore = inject(AddSubprogramsStore);
  updateSubrogramStore = inject(UpdateSubprogramsStore);
  deleteSubrogramStore = inject(DeleteSubprogramsStore);
  publishSubrogramStore = inject(PublishSubprogramsStore);
  highlightStore = inject(HighlightSubprogramStore);
  subprogram = signal<ISubprogram | null>(null);
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);
  url = environment.apiUrl + 'subprograms/logo/';
  icons = {
    refresh: RefreshCcw,
    edit: SquarePen,
    trash: Trash,
    plus: Plus,
    search: Search,
    eye: Eye,
    eyeOff: EyeOff,
    star: Star,
    starOff: StarOff,
  };
  showAddModal = signal(false);
  showEditModal = signal(false);
  queryParams = signal<FilterSubprogramsDto>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    q: this.#route.snapshot.queryParamMap.get('q'),
  });

  constructor() {
    this.searchForm = this.#fb.group({
      q: [this.queryParams().q || '', Validators.required],
    });
    this.addSubprogramForm = this.#fb.group({
      name: ['', Validators.required],
      programId: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.updateSubprogramForm = this.#fb.group({
      id: ['', Validators.required],
      programId: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadSubprograms();
  }

  get count(): number {
    return this.store.subprograms()[1];
  }

  highlightSubprogram(id: string): void {
    this.highlightStore.highlight(id);
  }

  loadSubprograms(): void {
    this.store.loadPrograms(this.queryParams());
  }

  async onPageChange(currentPage: number): Promise<void> {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    await this.updateRouteAndSubrograms();
  }

  onPublishProgram(id: string): void {
    this.publishSubrogramStore.publishProgram(id);
  }

  onFileUploadLoaded(): void {
    this.loadSubprograms();
  }

  async updateRoute(): Promise<void> {
    const queryParams = this.queryParams();
    await this.#router.navigate(['/dashboard/subprograms'], { queryParams });
  }

  async updateRouteAndSubrograms(): Promise<void> {
    await this.updateRoute();
    this.loadSubprograms();
  }

  async onResetSearch(): Promise<void> {
    this.searchForm.reset();
    this.queryParams.set({ page: null, q: null });
    await this.updateRouteAndSubrograms();
  }

  async onSearch(): Promise<void> {
    const searchValue = this.searchForm.value.q;
    this.queryParams.set({ page: null, q: searchValue });
    await this.updateRouteAndSubrograms();
  }

  onToggleAddModal(): void {
    this.showAddModal.update((v) => !v);
  }

  onToggleEditModal(subprogram: ISubprogram | null): void {
    this.subprogram.set(subprogram);
    this.updateSubprogramForm.patchValue({
      id: subprogram?.id || '',
      programId: subprogram?.program?.id || '',
      name: subprogram?.name || '',
      description: subprogram?.description || '',
    });
    this.showEditModal.update((v) => !v);
  }

  onAddProgram(): void {
    this.addSubprogramStore.addProgram({
      payload: this.addSubprogramForm.value,
      onSuccess: () => {
        this.onToggleAddModal();
        this.addSubprogramForm.reset();
      },
    });
  }

  onUpdateProgram(): void {
    this.updateSubrogramStore.updateProgram({
      payload: this.updateSubprogramForm.value,
      onSuccess: () => {
        this.onToggleEditModal(null);
        this.updateSubprogramForm.reset();
      },
    });
  }

  onDeleteRole(roleId: string, event: Event): void {
    this.#confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Etes-vous sûr ?',
      rejectButtonProps: {
        label: 'Annuler',
        severity: 'secondary',
        outlined: true,
      },
      acceptButtonProps: {
        label: 'Confirmer',
        severity: 'danger',
      },
      accept: () => {
        this.deleteSubrogramStore.deleteProgram(roleId);
      },
    });
  }
}

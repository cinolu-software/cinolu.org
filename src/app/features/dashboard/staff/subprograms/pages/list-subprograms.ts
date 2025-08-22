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
import { SubprogramsStore } from '../store/subprograms.store';
import { FilterSubprogramsDto } from '../dto/filter-subprograms.dto';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { AddSubprogramsStore } from '../store/add-subprograms.store';
import { Textarea } from 'primeng/textarea';
import { UpdateSubprogramsStore } from '../store/update-subprograms.store';
import { DeleteSubprogramsStore } from '../store/delete-subprograms.store';
import { IProgram } from '../../../../../shared/models/entities.models';
import { FileUpload } from '../../../../../shared/components/file-upload/file-upload';
import { environment } from '../../../../../../environments/environment';
import { ApiImgPipe } from '../../../../../shared/pipes/api-img.pipe';
import { AvatarModule } from 'primeng/avatar';
import { PublishSubprogramsStore } from '../store/publish-subprograms.store';

@Component({
  selector: 'app-programs-list',
  templateUrl: './list-subprograms.html',
  providers: [
    SubprogramsStore,
    DeleteSubprogramsStore,
    UpdateSubprogramsStore,
    AddSubprogramsStore,
    ConfirmationService,
    PublishSubprogramsStore,
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
  ],
})
export class ListSubprograms implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  #confirmationService = inject(ConfirmationService);
  searchForm: FormGroup;
  addProgramForm: FormGroup;
  updateProgramForm: FormGroup;
  store = inject(SubprogramsStore);
  addProgramStore = inject(AddSubprogramsStore);
  updateProgramStore = inject(UpdateSubprogramsStore);
  deleteProgramStore = inject(DeleteSubprogramsStore);
  publishProgramStore = inject(PublishSubprogramsStore);
  program = signal<IProgram | null>(null);
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);
  url = environment.apiUrl + 'programs/logo/';
  icons = {
    refresh: RefreshCcw,
    edit: SquarePen,
    trash: Trash,
    plus: Plus,
    search: Search,
    eye: Eye,
    eyeOff: EyeOff,
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
    this.addProgramForm = this.#fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
    this.updateProgramForm = this.#fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadPrograms();
  }

  loadPrograms(): void {
    this.store.loadPrograms(this.queryParams());
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndPrograms();
  }

  onPublishProgram(id: string): void {
    this.publishProgramStore.publishProgram(id);
  }

  onFileUploadLoaded(): void {
    this.loadPrograms();
  }

  async updateRoute(): Promise<void> {
    const queryParams = this.queryParams();
    await this.#router.navigate(['/dashboard/subprograms'], { queryParams });
  }

  async updateRouteAndPrograms(): Promise<void> {
    await this.updateRoute();
    this.loadPrograms();
  }

  async onResetSearch(): Promise<void> {
    this.searchForm.reset();
    this.queryParams.set({ page: null, q: null });
    await this.updateRouteAndPrograms();
  }

  async onSearch(): Promise<void> {
    const searchValue = this.searchForm.value.q;
    this.queryParams.set({ page: null, q: searchValue });
    await this.updateRouteAndPrograms();
  }

  onToggleAddModal(): void {
    this.showAddModal.update((v) => !v);
  }

  onToggleEditModal(program: IProgram | null): void {
    this.program.set(program);
    this.updateProgramForm.patchValue({
      id: program?.id || '',
      name: program?.name || '',
      description: program?.description || '',
    });
    this.showEditModal.update((v) => !v);
  }

  onAddProgram(): void {
    this.addProgramStore.addProgram({
      payload: this.addProgramForm.value,
      onSuccess: () => {
        this.onToggleAddModal();
        this.addProgramForm.reset();
      },
    });
  }

  onUpdateProgram(): void {
    this.updateProgramStore.updateProgram({
      payload: this.updateProgramForm.value,
      onSuccess: () => {
        this.onToggleEditModal(null);
        this.updateProgramForm.reset();
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
        this.deleteProgramStore.deleteProgram(roleId);
      },
    });
  }
}

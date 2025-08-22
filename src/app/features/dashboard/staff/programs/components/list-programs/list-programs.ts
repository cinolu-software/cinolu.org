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
  Layers,
  GitBranch,
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
import { ProgramsStore } from '../../store/list-programs/programs.store';
import { FilterProgramsDto } from '../../dto/list-programs/filter-programs.dto';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { AddProgramStore } from '../../store/list-programs/add-program.store';
import { Textarea } from 'primeng/textarea';
import { UpdateProgramStore } from '../../store/list-programs/update-program.store';
import { DeleteProgramStore } from '../../store/list-programs/delete-program.store';
import { IProgram } from '../../../../../../shared/models/entities.models';
import { FileUpload } from '../../../../../../shared/components/file-upload/file-upload';
import { environment } from '../../../../../../../environments/environment';
import { ApiImgPipe } from '../../../../../../shared/pipes/api-img.pipe';
import { AvatarModule } from 'primeng/avatar';
import { PublishProgramStore } from '../../store/list-programs/publish-program.store';

@Component({
  selector: 'app-list-programs',
  templateUrl: './list-programs.html',
  providers: [
    ProgramsStore,
    DeleteProgramStore,
    UpdateProgramStore,
    AddProgramStore,
    ConfirmationService,
    PublishProgramStore,
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
export class ListPrograms implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  #confirmationService = inject(ConfirmationService);
  searchForm: FormGroup;
  addProgramForm: FormGroup;
  updateProgramForm: FormGroup;
  store = inject(ProgramsStore);
  addProgramStore = inject(AddProgramStore);
  updateProgramStore = inject(UpdateProgramStore);
  deleteProgramStore = inject(DeleteProgramStore);
  publishProgramStore = inject(PublishProgramStore);
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
    program: Layers,
    subprograms: GitBranch,
  };
  showAddModal = signal(false);
  showEditModal = signal(false);
  queryParams = signal<FilterProgramsDto>({
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

  get count(): number {
    return this.store.programs()[1];
  }

  loadPrograms(): void {
    this.store.loadPrograms(this.queryParams());
  }

  async onPageChange(currentPage: number): Promise<void> {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    await this.updateRouteAndPrograms();
  }

  onPublishProgram(id: string): void {
    this.publishProgramStore.publishProgram(id);
  }

  onFileUploadLoaded(): void {
    this.loadPrograms();
  }

  async updateRoute(): Promise<void> {
    const queryParams = this.queryParams();
    await this.#router.navigate(['/dashboard/programs'], { queryParams });
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
        this.deleteProgramStore.deleteProgram({ id: roleId });
      },
    });
  }
}

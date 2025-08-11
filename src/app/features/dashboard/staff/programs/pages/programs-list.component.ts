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
import { ProgramsStore } from '../store/programs.store';
import { FilterProgramsDto } from '../dto/filter-programs.dto';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { AddProgramStore } from '../store/add-program.store';
import { Textarea } from 'primeng/textarea';
import { UpdateProgramStore } from '../store/update-program.store';
import { DeleteProgramStore } from '../store/delete-program.store';
import { IProgram } from '../../../../../shared/models/entities.models';
import { FileUploadComponent } from '../../../../../shared/components/file-upload/file-upload.component';
import { environment } from '../../../../../../environments/environment';
import { ApiImgPipe } from '../../../../../shared/pipes/api-img.pipe';
import { AvatarModule } from 'primeng/avatar';
import { PublishProgramStore } from '../store/publish-program.store';

@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
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
    FileUploadComponent,
    ApiImgPipe,
    AvatarModule,
  ],
})
export class ProgramsListComponent implements OnInit {
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

  updateRoute(): void {
    const queryParams = this.queryParams();
    this.#router.navigate(['/dashboard/programs'], { queryParams });
  }

  updateRouteAndPrograms(): void {
    this.updateRoute();
    this.loadPrograms();
  }

  onResetSearch(): void {
    this.searchForm.reset();
    this.queryParams.set({ page: null, q: null });
    this.updateRouteAndPrograms();
  }

  onSearch(): void {
    const searchValue = this.searchForm.value.q;
    this.queryParams.set({ page: null, q: searchValue });
    this.updateRouteAndPrograms();
  }

  onToggleAddModal(): void {
    this.showAddModal.update((v) => (v ? false : true));
  }

  onToggleEditModal(program: IProgram | null): void {
    this.program.set(program);
    this.updateProgramForm.patchValue({
      id: program?.id || '',
      name: program?.name || '',
      description: program?.description || '',
    });
    this.showEditModal.update((v) => (v ? false : true));
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

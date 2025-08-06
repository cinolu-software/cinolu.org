import { Component, inject, OnInit, signal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, RefreshCcw, Edit, Trash, Plus, Search } from 'lucide-angular';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  providers: [ProgramsStore, DeleteProgramStore, UpdateProgramStore, AddProgramStore, ConfirmationService],
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
    Textarea
  ]
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
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);
  icons = { refresh: RefreshCcw, edit: Edit, trash: Trash, plus: Plus, search: Search };
  showAddModal = signal(false);
  showEditModal = signal(false);
  queryParams = signal<FilterProgramsDto>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    q: this.#route.snapshot.queryParamMap.get('q')
  });

  constructor() {
    this.searchForm = this.#fb.group({
      q: [this.queryParams().q || '', Validators.required]
    });
    this.addProgramForm = this.#fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
    this.updateProgramForm = this.#fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required]
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
    this.showAddModal.set(!this.showAddModal());
  }

  onToggleEditModal(program: IProgram | null): void {
    this.updateProgramForm.patchValue({
      id: program?.id || '',
      name: program?.name || '',
      description: program?.description || ''
    });
    this.showEditModal.update((v) => !v);
  }

  onAddProgram(): void {
    this.addProgramStore.addProgram({
      payload: this.addProgramForm.value,
      onSuccess: () => {
        this.onToggleAddModal();
        this.addProgramForm.reset();
      }
    });
  }

  onUpdateProgram(): void {
    this.updateProgramStore.updateProgram({
      payload: this.updateProgramForm.value,
      onSuccess: () => {
        this.onToggleEditModal(null);
        this.updateProgramForm.reset();
      }
    });
  }

  onDeleteRole(roleId: string, event: Event): void {
    this.#confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Etes-vous sûr ?',
      rejectButtonProps: {
        label: 'Annuler',
        severity: 'secondary',
        outlined: true
      },
      acceptButtonProps: {
        label: 'Confirmer',
        severity: 'danger'
      },
      accept: () => {
        this.deleteProgramStore.deleteProgram({ id: roleId });
      }
    });
  }
}

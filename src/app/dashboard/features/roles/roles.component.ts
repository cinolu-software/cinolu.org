import { Component, inject, signal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, RefreshCcw, Edit, Plus, Trash, Search } from 'lucide-angular';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QueryParams } from '../../utils/types/query-params.type';
import { DashboardRolesStore } from '../../data-access/roles/roles.store';
import { DashboardAddRoleStore } from '../../data-access/roles/add-role.store';
import { ConfirmationService } from 'primeng/api';
import { DashboardDeleteRoleStore } from '../../data-access/roles/delete-role.store';
import { DashboardUpdateRoleStore } from '../../data-access/roles/update-role.store';
import { IRole } from '../../../shared/utils/types/models.type';
import { Dialog } from 'primeng/dialog';
import { ConfirmPopup } from 'primeng/confirmpopup';

@Component({
  selector: 'app-dashboard-roles',
  templateUrl: './roles.component.html',
  providers: [
    DashboardRolesStore,
    DashboardAddRoleStore,
    DashboardUpdateRoleStore,
    DashboardDeleteRoleStore,
    ConfirmationService
  ],
  imports: [
    LucideAngularModule,
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    Dialog,
    ConfirmPopup
  ]
})
export class DashboardRolesComponent {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  #confirmationService = inject(ConfirmationService);
  searchForm: FormGroup;
  addRoleForm: FormGroup;
  updateRoleForm: FormGroup;
  store = inject(DashboardRolesStore);
  addRoleStore = inject(DashboardAddRoleStore);
  deleteRoleStore = inject(DashboardDeleteRoleStore);
  updateRoleStore = inject(DashboardUpdateRoleStore);
  showAddModal = signal(false);
  showEditModal = signal(false);
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);
  icons = { refresh: RefreshCcw, edit: Edit, trash: Trash, plus: Plus, search: Search };
  queryParams = signal<QueryParams>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    q: this.#route.snapshot.queryParamMap.get('q')
  });

  constructor() {
    this.searchForm = this.#fb.group({
      q: [this.queryParams().q || '', Validators.required]
    });
    this.addRoleForm = this.#fb.group({
      name: ['', Validators.required]
    });
    this.updateRoleForm = this.#fb.group({
      id: [''],
      name: ['', Validators.required]
    });
  }

  loadRoles(): void {
    this.store.loadRoles(this.queryParams());
  }

  onToggleAddModal(): void {
    this.showAddModal.set(!this.showAddModal());
    if (this.showAddModal()) this.addRoleForm.reset();
  }

  onToggleEditModal(role: IRole | null): void {
    this.updateRoleForm.patchValue({
      id: role?.id || '',
      name: role?.name || ''
    });
    this.showEditModal.update((v) => !v);
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndRoles();
  }

  updateRoute(): void {
    const queryParams = this.queryParams();
    this.#router.navigate(['/dashboard/roles'], { queryParams });
  }

  updateRouteAndRoles(): void {
    this.updateRoute();
    this.loadRoles();
  }

  onResetSearch(): void {
    this.searchForm.reset();
    this.queryParams.set({ page: null, q: null });
    this.updateRouteAndRoles();
  }

  onSearch(): void {
    const searchValue = this.searchForm.value.q;
    this.queryParams.set({ page: null, q: searchValue });
    this.updateRouteAndRoles();
  }

  onAddRole(): void {
    if (this.addRoleForm.invalid) return;
    this.addRoleStore.addRole({
      payload: this.addRoleForm.value,
      queryParams: this.queryParams(),
      onSuccess: () => this.onToggleAddModal()
    });
  }

  onUpdateRole(): void {
    if (this.updateRoleForm.invalid) return;
    this.updateRoleStore.updateRole({
      id: this.updateRoleForm.value.id,
      payload: this.updateRoleForm.value,
      queryParams: this.queryParams(),
      onSuccess: () => this.onToggleEditModal(null)
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
        this.deleteRoleStore.deleteRole({
          id: roleId,
          queryParams: this.queryParams()
        });
      }
    });
  }
}

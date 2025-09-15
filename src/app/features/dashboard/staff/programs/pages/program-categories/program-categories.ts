import { Component, inject, OnInit, signal } from '@angular/core';
import {
  LucideAngularModule,
  RefreshCcw,
  SquarePen,
  Plus,
  Trash,
  Search,
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
import { ConfirmationService } from 'primeng/api';
import { Dialog } from 'primeng/dialog';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { CategoriesStore } from '../../store/categories/categories.store';
import { AddCategoryStore } from '../../store/categories/add-category.store';
import { DeleteCategoryStore } from '../../store/categories/delete-category.store';
import { UpdateCategoryStore } from '../../store/categories/update-category.store';
import { ICategory } from '../../../../../../shared/models/entities.models';
import { FilterProgramCategoriesDto } from '../../dto/categories/filter-categories.dto';

@Component({
  selector: 'app-project-categories',
  templateUrl: './program-categories.html',
  providers: [
    CategoriesStore,
    AddCategoryStore,
    UpdateCategoryStore,
    DeleteCategoryStore,
    ConfirmationService,
  ],
  imports: [
    LucideAngularModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    Dialog,
    ConfirmPopup,
  ],
})
export class ProgramCategories implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  #confirmationService = inject(ConfirmationService);
  searchForm: FormGroup;
  addCategoryForm: FormGroup;
  updateCategoryForm: FormGroup;
  store = inject(CategoriesStore);
  addCategoryStore = inject(AddCategoryStore);
  deleteCategoryStore = inject(DeleteCategoryStore);
  updateCategoryStore = inject(UpdateCategoryStore);
  showAddModal = signal(false);
  showEditModal = signal(false);
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);
  icons = {
    refresh: RefreshCcw,
    edit: SquarePen,
    trash: Trash,
    plus: Plus,
    search: Search,
  };
  queryParams = signal<FilterProgramCategoriesDto>({
    page: this.#route.snapshot.params['page'],
    q: this.#route.snapshot.params['q'],
  });

  constructor() {
    this.searchForm = this.#fb.group({
      q: [this.queryParams().q || '', Validators.required],
    });
    this.addCategoryForm = this.#fb.group({
      name: ['', Validators.required],
    });
    this.updateCategoryForm = this.#fb.group({
      id: [''],
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCategories();
  }

  get count(): number {
    return this.store.categories()[1];
  }

  loadCategories(): void {
    this.store.loadCategories(this.queryParams());
  }

  onToggleAddModal(): void {
    this.showAddModal.set(!this.showAddModal());
    if (this.showAddModal()) this.addCategoryForm.reset();
  }

  onToggleEditModal(category: ICategory | null): void {
    this.updateCategoryForm.patchValue({
      id: category?.id || '',
      name: category?.name || '',
    });
    this.showEditModal.update((v) => !v);
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndCategories();
  }

  updateRoute(): void {
    const queryParams = this.queryParams();
    this.#router.navigate(['/dashboard/project-categories'], { queryParams }).then();
  }

  updateRouteAndCategories(): void {
    this.updateRoute();
    this.loadCategories();
  }

  onResetSearch(): void {
    this.searchForm.reset();
    this.queryParams.set({ page: null, q: null });
    this.updateRouteAndCategories();
  }

  onSearch(): void {
    const searchValue = this.searchForm.value.q;
    this.queryParams.set({ page: null, q: searchValue });
    this.updateRouteAndCategories();
  }

  onAddCategory(): void {
    if (this.addCategoryForm.invalid) return;
    this.addCategoryStore.addCategory({
      payload: this.addCategoryForm.value,
      onSuccess: () => this.onToggleAddModal(),
    });
  }

  onUpdateCategory(): void {
    if (this.updateCategoryForm.invalid) return;
    this.updateCategoryStore.updateCategory({
      id: this.updateCategoryForm.value.id,
      payload: this.updateCategoryForm.value,
      onSuccess: () => this.onToggleEditModal(null),
    });
  }

  onDeleteCategory(categoryId: string, event: Event): void {
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
        this.deleteCategoryStore.deleteCategory(categoryId);
      },
    });
  }
}

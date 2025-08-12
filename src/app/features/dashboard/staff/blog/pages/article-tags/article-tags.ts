import { Component, inject, OnInit, signal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import {
  LucideAngularModule,
  Pencil,
  Plus,
  RefreshCcw,
  Search,
  Trash,
} from 'lucide-angular';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Dialog } from 'primeng/dialog';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { InputText } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { NgxPaginationModule } from 'ngx-pagination';
import { TagsStore } from '../../store/tags/tag.store';
import { AddTagStore } from '../../store/tags/add-tag.store';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterArticleTagsDto } from '../../dto/filter-tags.dto';
import { CommonModule } from '@angular/common';
import { ITag } from '../../../../../../shared/models/entities.models';

@Component({
  selector: 'app-article-tags',
  imports: [
    LucideAngularModule,
    ReactiveFormsModule,
    Dialog,
    ConfirmPopup,
    InputText,
    ProgressSpinnerModule,
    ButtonModule,
    NgxPaginationModule,
    CommonModule,
  ],
  templateUrl: './article-tags.html',
  providers: [TagsStore, AddTagStore],
  styles: ``,
})
export class ArticleTags implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  seachForm: FormGroup;
  addTagForm: FormGroup;
  updateTagForm: FormGroup;
  store = inject(TagsStore);
  addTagStore = inject(AddTagStore);
  showAddModal = signal(false);
  showEditModal = signal(false);
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);

  icons = {
    refresh: RefreshCcw,
    edit: Pencil,
    trash: Trash,
    plus: Plus,
    search: Search,
  };

  queryParams = signal<FilterArticleTagsDto>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    q: this.#route.snapshot.queryParamMap.get('q'),
  });

  constructor() {
    this.seachForm = this.#fb.group({
      q: [this.queryParams().q || '', Validators.required],
    });
    this.addTagForm = this.#fb.group({
      name: ['', Validators.required],
    });
    this.updateTagForm = this.#fb.group({
      id: [''],
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.store.loadTags(this.queryParams());
  }

  loadTags() {
    this.store.loadTags(this.queryParams());
  }

  onToggleAddModal() {
    this.showAddModal.set(!this.showAddModal());
    if (this.showAddModal()) this.addTagForm.reset();
  }

  onToggleEditModal(tag: ITag | null): void {
    this.updateTagForm.patchValue({
      id: tag?.id || '',
      name: tag?.name || '',
    });
    this.showEditModal.update((v) => !v);
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
  }

  updateRoute(): void {
    const queryParams = this.queryParams();
    this.#router.navigate(['/dashboard/article-tags'], { queryParams });
  }

  updateRouteAddTags(): void {
    this.updateRoute();
    this.loadTags();
  }

  onResetSearch(): void {
    this.seachForm.reset();
    this.queryParams.set({ page: null, q: null });
    this.updateRouteAddTags();
  }

  onSearch(): void {
    const searchValue = this.seachForm.value.q;
    this.queryParams.set({ page: null, q: searchValue });
    this.updateRouteAddTags();
  }

  onAddTag(): void {
    if (this.addTagForm.invalid) return;
    this.addTagStore.addTag({
      payload: this.addTagForm.value,
      onSuccess: () => this.onToggleAddModal(),
    });
  }


}

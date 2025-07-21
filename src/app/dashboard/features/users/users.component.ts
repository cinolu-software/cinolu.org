import { Component, inject, signal } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LucideAngularModule, RefreshCcw, Edit, Trash, Download, Search } from 'lucide-angular';
import { DashboardUsersStore } from '../../data-access/users/users.store';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { ApiImgPipe } from '../../../shared/pipes/api-img.pipe';
import { AvatarModule } from 'primeng/avatar';
import { ActivatedRoute, Router } from '@angular/router';
import { DownloadUsersStore } from '../../data-access/users/download-csv.store';
import { InputTextModule } from 'primeng/inputtext';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { QueryParams } from '../../utils/types/query-params.type';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  providers: [DashboardUsersStore, DownloadUsersStore],
  imports: [
    LucideAngularModule,
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    ApiImgPipe,
    AvatarModule,
    NgxPaginationModule,
    ReactiveFormsModule
  ]
})
export class DashboardUsersComponent {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  searchForm: FormGroup;
  store = inject(DashboardUsersStore);
  downloadStore = inject(DownloadUsersStore);
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);
  icons = { refresh: RefreshCcw, edit: Edit, trash: Trash, download: Download, search: Search };
  queryParams = signal<QueryParams>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    q: this.#route.snapshot.queryParamMap.get('q')
  });

  constructor() {
    this.searchForm = this.#fb.group({
      q: [this.queryParams().q || '', Validators.required]
    });
  }

  loadUsers(): void {
    this.store.loadUsers(this.queryParams());
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndUsers();
  }

  updateRoute(): void {
    const queryParams = this.queryParams();
    this.#router.navigate(['/dashboard/users'], { queryParams });
  }

  updateRouteAndUsers(): void {
    this.updateRoute();
    this.loadUsers();
  }

  onDownloadUsers(): void {
    this.downloadStore.downloadUsers(this.queryParams());
  }

  onResetSearch(): void {
    this.searchForm.reset();
    this.queryParams().q = null;
    this.updateRouteAndUsers();
  }

  onSearch(): void {
    const searchValue = this.searchForm.value.q;
    this.queryParams().q = searchValue ? searchValue : null;
    this.queryParams().page = null;
    this.updateRouteAndUsers();
  }
}

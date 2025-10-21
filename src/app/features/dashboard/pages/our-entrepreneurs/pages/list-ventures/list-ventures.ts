import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Download, LucideAngularModule, Plus, RefreshCw, Search, SquarePen, Trash } from 'lucide-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ApiImgPipe } from '../../../../../../shared/pipes/api-img.pipe';
import { DeleteUserStore } from '../../../users/store/users/delete-user.store';
import { ConfirmationService } from 'primeng/api';
import { DownloadUsersStore } from '../../../users/store/users/download-csv.store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FilterEntrepreneursDto } from '../../dto/users/filter-users.dto';
import { DeleteVentureStore } from '../../store/delete-venture.store';
import { VenturesStore } from '../../store/ventures.store';

@Component({
  selector: 'app-list-ventures',
  providers: [DownloadUsersStore, DeleteUserStore, ConfirmationService, VenturesStore],
  imports: [
    LucideAngularModule,
    CommonModule,
    ButtonModule,
    InputTextModule,
    ProgressSpinnerModule,
    AvatarModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    ConfirmPopup,
    RouterLink,
    ApiImgPipe,
  ],
  templateUrl: './list-ventures.html',
  styles: ``,
})
export class ListVentures implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  #confirmationService = inject(ConfirmationService);
  searchForm: FormGroup;
  store = inject(VenturesStore);
  deleteStore = inject(DeleteVentureStore);
  skeletonArray = Array.from({ length: 100 }, (_, i) => i + 1);
  #destroyRef = inject(DestroyRef);
  icons = {
    refresh: RefreshCw,
    edit: SquarePen,
    trash: Trash,
    download: Download,
    search: Search,
    plus: Plus,
  };
  queryParams = signal<FilterEntrepreneursDto>({
    page: this.#route.snapshot.queryParamMap.get('page'),
    q: this.#route.snapshot.queryParamMap.get('q'),
  });

  constructor() {
    this.searchForm = this.#fb.group({
      q: [this.queryParams().q || ''],
    });
  }

  ngOnInit(): void {
    this.loadVentures();
    const searchInput = this.searchForm.get('q');
    searchInput?.valueChanges
      .pipe(debounceTime(1000), distinctUntilChanged(), takeUntilDestroyed(this.#destroyRef))
      .subscribe((searchValue: string) => {
        this.queryParams().q = searchValue ? searchValue.trim() : null;
        this.queryParams().page = null;
        this.updateRouteAndUsers();
      });
  }

  loadVentures(): void {
    this.store.loadVentures();
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndUsers();
  }

  updateRoute(): void {
    const queryParams = this.queryParams();
    this.#router.navigate(['/dashboard/ventures'], { queryParams }).then();
  }

  updateRouteAndUsers(): void {
    this.updateRouteAndUsers();
    this.loadVentures();
  }

  onDeleteVenture(ventureId: string, event: Event): void {
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
        this.deleteStore.deleteVenture(ventureId);
      },
    });
  }
}

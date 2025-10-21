import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Download, LucideAngularModule, Plus, RefreshCw, SquarePen, Trash } from 'lucide-angular';
import { NgxPaginationModule } from 'ngx-pagination';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { ConfirmPopup } from 'primeng/confirmpopup';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ApiImgPipe } from '../../../../../../shared/pipes/api-img.pipe';
import { ConfirmationService } from 'primeng/api';
import { DownloadUsersStore } from '../../../users/store/users/download-csv.store';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FilterEntrepreneursDto } from '../../dto/users/filter-users.dto';
import { DeleteVentureStore } from '../../store/delete-venture.store';
import { VenturesStore } from '../../store/ventures.store';

@Component({
  selector: 'app-list-ventures',
  standalone: true,
  providers: [DownloadUsersStore, ConfirmationService, DeleteVentureStore, VenturesStore],
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
})
export class ListVentures implements OnInit {
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #fb = inject(FormBuilder);
  #confirmationService = inject(ConfirmationService);
  #destroyRef = inject(DestroyRef);

  store = inject(VenturesStore);
  deleteStore = inject(DeleteVentureStore);

  searchForm: FormGroup;

  skeletonArray = Array.from({ length: 40 }, (_, i) => i + 1);

  icons = {
    refresh: RefreshCw,
    edit: SquarePen,
    trash: Trash,
    download: Download,
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
      .pipe(debounceTime(800), distinctUntilChanged(), takeUntilDestroyed(this.#destroyRef))
      .subscribe((searchValue: string) => {
        this.queryParams().q = searchValue?.trim() || null;
        this.queryParams().page = null;
        this.updateRouteAndVentures();
      });
  }

  loadVentures(): void {
    this.store.loadVentures();
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndVentures();
  }

  updateRoute(): void {
    const queryParams = this.queryParams();
    this.#router.navigate(['/dashboard/entrepreneurs/ventures'], { queryParams }).then();
  }

  onDeleteVenture(ventureId: string, event: Event): void {
    this.#confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Êtes-vous sûr de vouloir supprimer cette entreprise ?',
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

  async updateRouteAndVentures(): Promise<void> {
    await this.updateRoute();
    this.updateRoute();
    this.loadVentures();
  }

  sectorColor(sector: string): string {
    const s = sector?.toLowerCase() ?? '';
    if (s.includes('agro')) return 'linear-gradient(to right, #22c55e, #16a34a)';
    if (s.includes('finance')) return 'linear-gradient(to right, #3b82f6, #1d4ed8)';
    if (s.includes('industrie')) return 'linear-gradient(to right, #facc15, #eab308)';
    if (s.includes('médias') || s.includes('media')) return 'linear-gradient(to right, #8b5cf6, #7c3aed)';
    if (s.includes('tech')) return 'linear-gradient(to right, #0ea5e9, #0284c7)';
    return 'linear-gradient(to right, #9ca3af, #6b7280)';
  }
}

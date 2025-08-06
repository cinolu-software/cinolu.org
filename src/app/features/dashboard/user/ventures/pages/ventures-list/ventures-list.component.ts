import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LucideAngularModule, Plus, Edit, Trash, Eye } from 'lucide-angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { VenturesStore } from '../../store/ventures.store';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { DeleteVentureStore } from '../../store/delete-venture.store';
import { FilterVenturesDto } from '../../dto/filter-venture.dto';
import { ApiImgPipe } from '../../../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-ventures-list',
  templateUrl: './ventures-list.component.html',
  providers: [VenturesStore, DeleteVentureStore, ConfirmationService],
  imports: [
    ButtonModule,
    InputTextModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    LucideAngularModule,
    ApiImgPipe,
    NgxPaginationModule,
    NgOptimizedImage,
    ConfirmPopupModule
  ]
})
export class VenturesListComponent implements OnInit {
  icons = { plus: Plus, edit: Edit, trash: Trash, eye: Eye };
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #confirmationService = inject(ConfirmationService);
  store = inject(VenturesStore);
  deleteVentureStore = inject(DeleteVentureStore);
  queryParams = signal<FilterVenturesDto>({
    page: this.#route.snapshot.queryParams?.['page']
  });

  ngOnInit(): void {
    this.store.loadVentures(this.queryParams());
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndEnterprises();
  }

  updateRoute(): void {
    const { page } = this.queryParams();
    const queryParams = { page };
    this.#router.navigate(['/dashboard/ventures/list'], { queryParams });
  }

  updateRouteAndEnterprises(): void {
    this.updateRoute();
    this.store.loadVentures(this.queryParams());
  }

  onDeleteVenture(id: string, event: Event): void {
    this.#confirmationService.confirm({
      target: event.currentTarget as EventTarget,
      message: 'Etes-vous sûr?',
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
        this.deleteVentureStore.deleteVenture(id);
      }
    });
  }
}

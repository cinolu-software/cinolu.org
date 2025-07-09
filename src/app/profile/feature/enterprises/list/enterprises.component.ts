import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LucideAngularModule, Plus, Edit, Trash, Eye } from 'lucide-angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EnterprisesStore } from '../../../data-access/enterprises/enterprises.store';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { QueryParams } from '../../../utils/types/enterprises/query-params.type';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { DeleteEnterpriseStore } from '../../../data-access/enterprises/delete-enterprise.store';

@Component({
  selector: 'app-user-enterprises',
  templateUrl: './enterprises.component.html',
  providers: [EnterprisesStore, DeleteEnterpriseStore, ConfirmationService],
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
export class UserEnterprisesComponent implements OnInit {
  icons = { plus: Plus, edit: Edit, trash: Trash, eye: Eye };
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  #confirmationService = inject(ConfirmationService);
  store = inject(EnterprisesStore);
  deleteStore = inject(DeleteEnterpriseStore);
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParams?.['page']) || null
  });

  ngOnInit(): void {
    this.store.loadEnterprises(this.queryParams());
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage;
    this.updateRouteAndEnterprises();
  }

  updateRoute(): void {
    const { page } = this.queryParams();
    const queryParams = { page };
    this.#router.navigate(['/profile/enterprises'], { queryParams });
  }

  updateRouteAndEnterprises(): void {
    this.updateRoute();
    this.store.loadEnterprises(this.queryParams());
  }

  onDeleteEnterprise(id: string, event: Event): void {
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
        this.deleteStore.deleteEnterprise(id);
      }
    });
  }
}

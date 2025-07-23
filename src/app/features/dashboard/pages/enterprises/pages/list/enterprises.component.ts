import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LucideAngularModule, Plus, Edit, Trash, Eye } from 'lucide-angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EnterprisesStore } from '../../store/enterprises.store';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { DeleteEnterpriseStore } from '../../store/delete-enterprise.store';
import { ApiImgPipe } from '../../../../../../shared/pipes/api-img.pipe';
import { EnterprisesQueryParams } from '../../dto/query-params.dto';

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
  queryParams = signal<EnterprisesQueryParams>({
    page: this.#route.snapshot.queryParams?.['page']
  });

  ngOnInit(): void {
    this.store.loadEnterprises(this.queryParams());
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage.toString();
    this.updateRouteAndEnterprises();
  }

  updateRoute(): void {
    const { page } = this.queryParams();
    const queryParams = { page };
    this.#router.navigate(['/dashboard/enterprises'], { queryParams });
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

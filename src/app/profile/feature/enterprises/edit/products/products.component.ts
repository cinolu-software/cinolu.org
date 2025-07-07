import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LucideAngularModule, Plus, Edit, Trash, Eye } from 'lucide-angular';
import { RouterModule } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmationService } from 'primeng/api';
import { ApiImgPipe } from '../../../../../shared/pipes/api-img.pipe';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  providers: [],
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
export class ProductsComponent {
  icons = { plus: Plus, edit: Edit, trash: Trash, eye: Eye };
  // #route = inject(ActivatedRoute);
  // #router = inject(Router);
  #confirmationService = inject(ConfirmationService);
  // queryParams = signal<QueryParams>({
  //   page: Number(this.#route.snapshot.queryParams?.['page']) || null
  // });

  // ngOnInit(): void {
  //   // this.store.loadEnterprises(this.queryParams());
  // }

  onPageChange(currentPage: number): void {
    console.log(`Current page: ${currentPage}`);
    // this.queryParams().page = currentPage === 1 ? null : currentPage;
    this.updateRouteAndEnterprises();
  }

  updateRoute(): void {
    // const { page } = this.queryParams();
    // const queryParams = { page };
    // this.#router.navigate(['/profile/enterprises'], { queryParams });
  }

  updateRouteAndEnterprises(): void {
    this.updateRoute();
    // this.store.loadEnterprises(this.queryParams());
  }

  confirmPopup(id: string, event: Event): void {
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
        console.log(`Confirmed deletion of product with ID: ${id}`);
        // this.deleteStore.deleteEnterprise(id);
      }
    });
  }
}

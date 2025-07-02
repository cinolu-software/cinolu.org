import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { EnterprisesStore } from '../../../data-access/enterprises.store';
import { ApiImgPipe } from '../../../../shared/pipes/api-img.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { QueryParams } from '../../../utils/types/query-params.type';

@Component({
  selector: 'app-profile-enterprises',
  templateUrl: './enterprises.component.html',
  providers: [EnterprisesStore],
  imports: [
    ButtonModule,
    InputTextModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    LucideAngularModule,
    ApiImgPipe,
    NgxPaginationModule,
    NgOptimizedImage
  ]
})
export class ProfileEnterprisesComponent implements OnInit {
  icons = { plus: Plus };
  #route = inject(ActivatedRoute);
  #router = inject(Router);
  store = inject(EnterprisesStore);
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
    this.#router.navigate(['/programs'], { queryParams });
  }

  updateRouteAndEnterprises(): void {
    this.updateRoute();
    this.store.loadEnterprises(this.queryParams());
  }
}

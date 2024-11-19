import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { IProgramCategory, IProgram, IProgramType } from 'app/common/types/models.type';
import { ProgramsService } from './programs.service';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProgramCardComponent } from './components/program-card/program-card.component';
import { ProgramCardSkeletonComponent } from './components/program-card-skeleton/program-card-skeleton.component';
import { QueryParams } from './types/query-params.type';
import { TopbarComponent } from '../../../common/components/topbar/topbar.component';
import { Observable } from 'rxjs';
import { IAPIResponse } from '@core/services/api/types/api-response.type';

const SKELETON_ITEM_COUNT = 9;

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [
    CommonModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatSlideToggleModule,
    NgxPaginationModule,
    ProgramCardComponent,
    ProgramCardSkeletonComponent,
    TopbarComponent
  ],
  templateUrl: './programs.component.html'
})
export class ProgramsComponent implements OnInit {
  skeletonArray = Array(SKELETON_ITEM_COUNT).fill(0);
  programs$: Observable<IAPIResponse<{ programs: IProgram[]; count: number }>>;
  types$: Observable<IAPIResponse<IProgramType[]>>;
  categories$: Observable<IAPIResponse<IProgramCategory[]>>;
  #programsService = inject(ProgramsService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  queryParams: QueryParams = {
    page: Number(this.#route.snapshot.queryParams?.page) || null,
    type: this.#route.snapshot.queryParams?.type || null,
    category: this.#route.snapshot.queryParams?.category || null,
    hideFinished: !!this.#route.snapshot.queryParams?.hideFinished
  };

  ngOnInit(): void {
    this.loadPrograms();
    this.types$ = this.#programsService.getTypes();
    this.categories$ = this.#programsService.getCategories();
  }

  onFilterChange(event: MatSelectChange, filter: string): void {
    this.queryParams.page = null;
    this.queryParams[filter] = event.value === 'all' ? null : event.value;
    this.updateRouteAndPrograms();
  }

  toogleFinished(): void {
    this.queryParams.page = null;
    this.queryParams.hideFinished = !this.queryParams.hideFinished;
    this.updateRouteAndPrograms();
  }

  onPageChange(currentPage: number): void {
    this.queryParams.page = currentPage === 1 ? null : currentPage;
    this.updateRouteAndPrograms();
  }

  loadPrograms(): void {
    this.programs$ = this.#programsService.getPrograms(this.queryParams);
  }

  updateRoute(): void {
    const { page, type, category, hideFinished } = this.queryParams;
    const queryParams = { page, type, category };
    if (hideFinished) queryParams['hideFinished'] = hideFinished;
    this.#router.navigate(['/programs'], { queryParams });
  }

  updateRouteAndPrograms(): void {
    this.updateRoute();
    this.loadPrograms();
  }
}

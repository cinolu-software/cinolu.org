import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ObservableQueryResult } from '@ngneat/query';
import { IProgram, IType } from '@core/types/models.type';
import { ListProgramsService } from './list.service';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProgramCardComponent } from '../../slots/program-card/program-card.component';
import { ProgramCardSkeletonComponent } from '../../slots/program-card-skeleton/program-card-skeleton.component';
import { QueryParams } from '../../types/query-params.type';

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
    RouterLink,
    NgxPaginationModule,
    ProgramCardComponent,
    ProgramCardSkeletonComponent
  ],
  templateUrl: './list.component.html'
})
export class ListProgramsComponent implements OnInit {
  skeletonArray = Array(SKELETON_ITEM_COUNT).fill(0);
  programs$: ObservableQueryResult<{ programs: IProgram[]; count: number }, Error>;
  type$: ObservableQueryResult<IType[], Error>;
  #listProgramService = inject(ListProgramsService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  queryParams: QueryParams = {
    page: Number(this.#route.snapshot.queryParams?.page) || null,
    type: this.#route.snapshot.queryParams?.type || null,
    hideFinished: !!this.#route.snapshot.queryParams?.hideFinished
  };

  ngOnInit(): void {
    this.loadPrograms();
    this.type$ = this.#listProgramService.getTypes();
  }

  onTypeChange(event: MatSelectChange): void {
    this.queryParams.page = null;
    this.queryParams.type = event.value === 'all' ? null : event.value;
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
    this.programs$ = this.#listProgramService.getPrograms(this.queryParams);
  }

  updateRoute(): void {
    const { page, type, hideFinished } = this.queryParams;
    const queryParams = { page, type };
    if (hideFinished) queryParams['hideFinished'] = hideFinished;
    this.#router.navigate(['/programs'], { queryParams });
  }

  updateRouteAndPrograms(): void {
    this.updateRoute();
    this.loadPrograms();
  }
}

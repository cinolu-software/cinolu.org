import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { IProgramCategory, IProgram, IProgramType } from 'app/shared/utils/types/models.type';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProgramCardComponent } from '../../../shared/ui/program-card/program-card.component';
import { ProgramCardSkeletonComponent } from '../../../shared/ui/program-card-skeleton/program-card-skeleton.component';
import { QueryParams } from '../../utils/types/query-params.type';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { ProgramsService } from '../../data-access/programs.service';

@Component({
  selector: 'app-programs',
  providers: [ProgramsService],
  imports: [
    CommonModule,
    MatOptionModule,
    MatIconModule,
    MatSlideToggleModule,
    NgxPaginationModule,
    ProgramCardComponent,
    ProgramCardSkeletonComponent,
    MatChipsModule
  ],
  templateUrl: './programs.component.html'
})
export class ProgramsComponent implements OnInit {
  skeletonArray = Array(9).fill(0);
  programs$: Observable<IAPIResponse<{ programs: IProgram[]; count: number }>>;
  types$: Observable<IAPIResponse<IProgramType[]>>;
  categories$: Observable<IAPIResponse<IProgramCategory[]>>;
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  #programsService = inject(ProgramsService);
  queryParams = signal<QueryParams>({
    page: Number(this.#route.snapshot.queryParams?.page) || null,
    type: this.#route.snapshot.queryParams?.type || null,
    category: this.#route.snapshot.queryParams?.category || null,
    hideFinished: !!this.#route.snapshot.queryParams?.hideFinished
  });

  ngOnInit(): void {
    this.loadPrograms();
    this.types$ = this.#programsService.getTypes();
    this.categories$ = this.#programsService.getCategories();
  }

  onFilterChange(event: MatChipListboxChange, filter: string): void {
    this.queryParams().page = null;
    this.queryParams()[filter] = event.value === 'Tous' ? null : event.value;
    this.updateRouteAndPrograms();
  }

  toogleFinished(): void {
    this.queryParams().page = null;
    this.queryParams().hideFinished = !this.queryParams().hideFinished;
    this.updateRouteAndPrograms();
  }

  onPageChange(currentPage: number): void {
    this.queryParams().page = currentPage === 1 ? null : currentPage;
    this.updateRouteAndPrograms();
  }

  loadPrograms(): void {
    this.programs$ = this.#programsService.getPrograms(this.queryParams());
  }

  updateRoute(): void {
    const { page, type, category, hideFinished } = this.queryParams();
    const queryParams = { page, type, category };
    if (hideFinished) queryParams['hideFinished'] = hideFinished;
    this.#router.navigate(['/programs'], { queryParams });
  }

  updateRouteAndPrograms(): void {
    this.updateRoute();
    this.loadPrograms();
  }
}

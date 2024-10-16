import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ObservableQueryResult } from '@ngneat/query';
import { IProgram, IType } from 'app/common/types/models.type';
import { ProgramsService } from './programs.service';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProgramCardComponent } from './utils/slots/program-card/program-card.component';
import { ProgramCardSkeletonComponent } from './utils/slots/program-card-skeleton/program-card-skeleton.component';
import { QueryParams } from './types/query-params.type';

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    MatInputModule,
    MatSlideToggleModule,
    MatTooltipModule,
    MatProgressBarModule,
    RouterLink,
    NgxPaginationModule,
    ProgramCardComponent,
    ProgramCardSkeletonComponent
  ],
  templateUrl: './programs.component.html'
})
export class ProgramsComponent implements OnInit {
  skeletonArray = Array(20).fill(0);
  programs$: ObservableQueryResult<{ programs: IProgram[]; count: number }, Error>;
  type$: ObservableQueryResult<IType[], Error>;
  #programService = inject(ProgramsService);
  #router = inject(Router);
  #route = inject(ActivatedRoute);
  queryParams: QueryParams = {
    page: +this.#route.snapshot.queryParams['page'] || null,
    type: this.#route.snapshot.queryParams['type'] || null
  };

  ngOnInit(): void {
    this.loadPrograms();
    this.type$ = this.#programService.getTypes();
  }

  onTypeChange(event: MatSelectChange): void {
    this.queryParams.page = null;
    this.queryParams.type = event.value === 'all' ? null : event.value;
    this.updateRouteAndPrograms();
  }

  onPageChange(currentPage: number): void {
    this.updateRouteAndPrograms();
    window.scrollTo({ top: 0 });
    this.queryParams.page = currentPage;
  }

  private loadPrograms(): void {
    this.programs$ = this.#programService.getPrograms(this.queryParams);
  }

  private updateRouteAndPrograms(): void {
    this.#router.navigate(['/programs'], { queryParams: this.queryParams });
    this.loadPrograms();
  }
}

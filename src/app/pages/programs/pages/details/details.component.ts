import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ObservableQueryResult } from '@ngneat/query';
import { IProgram, IType } from 'app/common/types/models.type';
import { DetailsProgramsService } from './details.service';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProgramCardComponent } from '../../slots/program-card/program-card.component';
import { ProgramCardSkeletonComponent } from '../../slots/program-card-skeleton/program-card-skeleton.component';
import { TopbarComponent } from '../../../../common/components/topbar/topbar.component';

const SKELETON_ITEM_COUNT = 9;

@Component({
  selector: 'app-programs',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatTooltipModule,
    RouterLink,
    NgxPaginationModule,
    ProgramCardComponent,
    ProgramCardSkeletonComponent,
    TopbarComponent
  ],
  templateUrl: './details.component.html'
})
export class DetailsProgramsComponent implements OnInit {
  skeletonArray = Array(SKELETON_ITEM_COUNT).fill(0);
  program$: ObservableQueryResult<IProgram, Error>;
  type$: ObservableQueryResult<IType[], Error>;
  #detailsProgramService = inject(DetailsProgramsService);
  #activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    const id = this.#activatedRoute.snapshot.paramMap.get('id');
    this.program$ = this.#detailsProgramService.getProgram(id);
  }
}

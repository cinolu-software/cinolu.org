import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ObservableQueryResult } from '@ngneat/query';
import { IProgram, IType } from '@core/types/models.type';
import { DetailsProgramsService } from './details.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProgramCardComponent } from '../../slots/program-card/program-card.component';
import { ProgramCardSkeletonComponent } from '../../slots/program-card-skeleton/program-card-skeleton.component';
import { environment } from 'environments/environment';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

const SKELETON_ITEM_COUNT = 9;

@Component({
  selector: 'app-program',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    ProgramCardComponent,
    MatIconModule,
    MatButtonModule,
    ProgramCardSkeletonComponent,
    NgOptimizedImage
  ],
  templateUrl: './details.component.html'
})
export class DetailsProgramsComponent implements OnInit {
  skeletonArray = Array(SKELETON_ITEM_COUNT).fill(0);
  program$: ObservableQueryResult<IProgram, Error>;
  type$: ObservableQueryResult<IType[], Error>;
  #detailsProgramService = inject(DetailsProgramsService);
  #activatedRoute = inject(ActivatedRoute);
  #location = inject(Location);

  ngOnInit(): void {
    const id = this.#activatedRoute.snapshot.paramMap.get('id');
    this.program$ = this.#detailsProgramService.getProgram(id);
  }

  getImage(program: IProgram): string {
    return program.image ? `${environment.apiUrl}uploads/programs/${program.image}` : '/images/no-image.jpg';
  }

  back(): void {
    this.#location.back();
  }
}

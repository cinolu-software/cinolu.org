import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ObservableQueryResult } from '@ngneat/query';
import { IProgram } from '@core/types/models.type';
import { DetailsProgramsService } from './details.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ImgPipe } from '@core/pipes/img.pipe';
import { ProgramCardComponent } from '../../slots/program-card/program-card.component';
import { ProgramCardSkeletonComponent } from '../../slots/program-card-skeleton/program-card-skeleton.component';

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
    NgOptimizedImage,
    ImgPipe
  ],
  templateUrl: './details.component.html'
})
export class DetailsProgramsComponent implements OnInit {
  program$: ObservableQueryResult<IProgram, Error>;
  #detailsProgramService = inject(DetailsProgramsService);
  #activatedRoute = inject(ActivatedRoute);
  #location = inject(Location);

  ngOnInit(): void {
    const id = this.#activatedRoute.snapshot.paramMap.get('id');
    this.program$ = this.#detailsProgramService.getProgram(id);
  }

  back(): void {
    this.#location.back();
  }
}

import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ObservableQueryResult } from '@ngneat/query';
import { IProgram } from 'app/common/types/models.type';
import { ProgramService } from './program.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ImgPipe } from 'app/common/pipes/img.pipe';
import { ProgramCardComponent } from '../../components/program-card/program-card.component';
import { ProgramCardSkeletonComponent } from '../../components/program-card-skeleton/program-card-skeleton.component';

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
  templateUrl: './program.component.html'
})
export class ProgramComponent implements OnInit {
  program$: ObservableQueryResult<IProgram, Error>;
  #detailsProgramService = inject(ProgramService);
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

import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ObservableQueryResult } from '@ngneat/query';
import { IProgram } from '../../common/types/models.type';
import { ProgramsService } from './programs.service';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';

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
    NgxPaginationModule
  ],
  templateUrl: './programs.component.html'
})
export class ProgramsComponent implements OnInit {
  currentPage = 1;
  programs$: ObservableQueryResult<{ programs: IProgram[]; count: number }, Error>;
  #programService = inject(ProgramsService);

  ngOnInit(): void {
    this.programs$ = this.#programService.getPrograms(this.currentPage);
  }

  onPageChange(currentPage: number) {
    this.currentPage = currentPage;
    this.programs$ = this.#programService.getPrograms(currentPage);
    window.scrollTo({ top: 0 });
  }

  isEnded(program: IProgram): boolean {
    return program.end_at >= new Date('now');
  }
}

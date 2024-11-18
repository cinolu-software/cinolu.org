import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ObservableQueryResult } from '@ngneat/query';
import { IProgram } from 'app/common/types/models.type';
import { ProgramService } from './program.service';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ImgPipe } from 'app/common/pipes/img.pipe';

@Component({
  selector: 'app-program',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, NgOptimizedImage, ImgPipe],
  templateUrl: './program.component.html'
})
export class ProgramComponent implements OnInit {
  program$: ObservableQueryResult<IProgram, Error>;
  #programService = inject(ProgramService);
  #activatedRoute = inject(ActivatedRoute);
  #location = inject(Location);

  ngOnInit(): void {
    const id = this.#activatedRoute.snapshot.paramMap.get('id');
    this.program$ = this.#programService.getProgram(id);
  }

  back(): void {
    this.#location.back();
  }
}

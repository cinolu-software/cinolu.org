import { CommonModule, Location, NgOptimizedImage } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ObservableQueryResult } from '@ngneat/query';
import { IProgram } from 'app/common/types/models.type';
import { ProgramService } from './program.service';
import { ActivatedRoute } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ImgPipe } from 'app/common/pipes/img.pipe';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-program',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    ImgPipe
  ],
  templateUrl: './program.component.html'
})
export class ProgramComponent implements OnInit {
  program$: ObservableQueryResult<IProgram, Error>;
  form: FormGroup;
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

  generateInputsArray(jsonData: string): { label: string; name: string; type: string }[] {
    const parsedData = JSON.parse(jsonData);
    return (
      parsedData?.iputs.map((input: unknown) => ({
        label: input['label'],
        name: input['name'],
        type: input['type']
      })) || null
    );
  }
}

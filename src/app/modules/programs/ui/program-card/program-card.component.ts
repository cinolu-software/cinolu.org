import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IProgram } from 'app/shared/utils/types/models.type';
import { RouterLink } from '@angular/router';
import { APIImgPipe } from 'app/shared/pipes/api-img.pipe';

@Component({
  selector: 'app-program-card',
  imports: [MatIconModule, MatTooltipModule, CommonModule, NgOptimizedImage, RouterLink, APIImgPipe],
  templateUrl: './program-card.component.html'
})
export class ProgramCardComponent {
  program = input.required<IProgram>();

  isFinished(program: IProgram): boolean {
    return new Date(program.ended_at) <= new Date();
  }
}

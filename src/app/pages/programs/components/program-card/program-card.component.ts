import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IProgram } from 'app/common/types/models.type';
import { RouterLink } from '@angular/router';
import { ImgPipe } from 'app/common/pipes/img.pipe';

@Component({
  selector: 'app-program-card',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, CommonModule, NgOptimizedImage, RouterLink, ImgPipe],
  templateUrl: './program-card.component.html'
})
export class ProgramCardComponent {
  program = input.required<IProgram>();

  isFinished(program: IProgram): boolean {
    return new Date(program.ended_at) <= new Date();
  }
}

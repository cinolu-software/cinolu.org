import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IProgram } from 'app/common/types/models.type';
import { environment } from '../../../../../environments/environment';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-program-card',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './program-card.component.html'
})
export class ProgramCardComponent {
  program = input.required<IProgram>();

  getImage(program: IProgram): string {
    return program.image ? `${environment.apiUrl}uploads/programs/${program.image}` : '/images/no-image.jpg';
  }

  isFinished(program: IProgram): boolean {
    return new Date(program.ended_at) <= new Date();
  }
}

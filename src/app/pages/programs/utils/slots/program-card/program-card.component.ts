import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { IProgram } from 'app/common/types/models.type';

@Component({
  selector: 'app-program-card',
  standalone: true,
  imports: [MatIconModule, MatTooltipModule, CommonModule],
  templateUrl: './program-card.component.html'
})
export class ProgramCardComponent {
  program = input.required<IProgram>();
}

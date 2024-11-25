import { Component, input } from '@angular/core';
import { IProgram } from 'app/shared/types/models.type';
import { DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-program-overview',
  imports: [MatIconModule, DatePipe],
  templateUrl: './overview.component.html'
})
export class ProgramOverviewComponent {
  program = input.required<IProgram>();

  join(arr: unknown[]): string {
    return arr.map((a) => a['name']).join(', ');
  }
}

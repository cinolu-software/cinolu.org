import { Component, input, signal } from '@angular/core';
import { IProgram } from 'app/shared/utils/types/models.type';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-program-overview',
  imports: [MatIconModule, DatePipe, MatIconModule, CommonModule],
  templateUrl: './overview.component.html'
})
export class ProgramOverviewComponent {
  program = input.required<IProgram>();
  expanded = signal<string | null>(null);

  join(arr: unknown[]): string {
    return arr.map((a) => a['name']).join(', ');
  }

  expand(id: string): void {
    if (this.expanded() === id) {
      this.expanded.set(null);
      return;
    }
    this.expanded.set(id);
  }
}

import { Component, input, signal } from '@angular/core';
import { IProject } from 'app/shared/utils/types/models.type';
import { CommonModule, DatePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project-overview',
  imports: [MatIconModule, DatePipe, MatIconModule, CommonModule],
  templateUrl: './overview.component.html'
})
export class ProjectOverviewComponent {
  project = input.required<IProject>();
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

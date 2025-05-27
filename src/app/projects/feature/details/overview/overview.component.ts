import { Component, input, signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgIcon } from '@ng-icons/core';
import { AccordionModule } from 'primeng/accordion';
import { IProject } from '../../../../shared/utils/types/models.type';

@Component({
  selector: 'app-project-overview',
  imports: [NgIcon, DatePipe, CommonModule, AccordionModule],
  templateUrl: './overview.component.html',
})
export class ProjectOverviewComponent {
  project = input.required<IProject>();
  expanded = signal<string | null>(null);

  // join(arr: unknown[]): string {
  //   return arr.map((a) => a['name']).join(', ');
  // }

  expand(id: string): void {
    if (this.expanded() === id) {
      this.expanded.set(null);
      return;
    }
    this.expanded.set(id);
  }
}

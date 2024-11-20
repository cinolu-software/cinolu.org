import { Component, inject, input } from '@angular/core';
import { IProgram } from '../../../../../common/types/models.type';
import { DatePipe, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-program-overview',
    imports: [MatIconModule, DatePipe],
    templateUrl: './overview.component.html'
})
export class ProgramOverviewComponent {
  program = input.required<IProgram>();
  #location = inject(Location);

  back(): void {
    this.#location.back();
  }
}

import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IPhase, IProject } from 'app/shared/utils/types/models.type';
import { CommonModule } from '@angular/common';
import { Animations } from 'app/shared/utils/animations';

@Component({
  selector: 'app-project-application',
  animations: Animations,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatProgressSpinnerModule],
  templateUrl: './application.component.html'
})
export class ProjectApplicationComponent {
  project = input.required<IProject>();

  includForm(phases: IPhase[]): IPhase {
    return phases.find((p) => p.form !== null);
  }
}

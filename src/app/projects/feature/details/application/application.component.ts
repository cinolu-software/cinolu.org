import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IApplication, IProject } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { CommonModule } from '@angular/common';
import { AlertComponent } from 'app/shared/ui/alert/alert.component';
import { Animations } from 'app/shared/utils/animations';
import { ProjectsService } from '../../../data-access/projects.service';

@Component({
  selector: 'app-project-application',
  animations: Animations,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatProgressSpinnerModule, AlertComponent],
  templateUrl: './application.component.html'
})
export class ProjectApplicationComponent {
  project = input.required<IProject>();
  formData = {};
  application$: Observable<IAPIResponse<IApplication>>;
  #projectsService = inject(ProjectsService);

  onSubmit(): void {
    this.application$ = this.#projectsService.apply({ project: this.project().id, answers: this.formData as JSON });
  }
}

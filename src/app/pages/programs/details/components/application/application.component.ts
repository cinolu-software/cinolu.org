import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IApplication, IProgram } from 'app/common/types/models.type';
import { ApplicationService } from './application.service';
import { Observable } from 'rxjs';
import { IAPIResponse } from '@core/services/api/types/api-response.type';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '@core/components/alert/alert.component';
import { Animations } from '@core/animations';

@Component({
  selector: 'app-program-application',
  animations: Animations,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, MatProgressSpinnerModule, AlertComponent],
  templateUrl: './application.component.html'
})
export class ApplicationComponent {
  program = input.required<IProgram>();
  formData = {};
  application$: Observable<IAPIResponse<IApplication>>;
  #applicationService = inject(ApplicationService);

  onSubmit(): void {
    this.application$ = this.#applicationService.apply({ program: this.program().id, answers: this.formData as JSON });
  }
}

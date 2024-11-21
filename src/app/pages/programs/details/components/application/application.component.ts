import { Component, inject, input, viewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IApplication, IProgram } from 'app/common/types/models.type';
import { ApplicationService } from './application.service';
import { IApplicationPayload } from './types/application-payload.type';
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
  form = viewChild<NgForm>('applicationForm');
  formData = {};
  application$: Observable<IAPIResponse<IApplication>>;
  #applicationService = inject(ApplicationService);

  generateInputsArray(jsonData: string): { required: boolean; label: string; name: string; type: string }[] {
    const parsedData = JSON.parse(jsonData);
    return parsedData?.iputs.map((input: unknown) => input) || null;
  }

  #disableForm(): void {
    Object.keys(this.form().controls).forEach((key) => {
      this.form().controls[key].disable();
    });
  }

  onSubmit(): void {
    this.#disableForm();
    const payload: IApplicationPayload = { program: this.program().id, answers: this.formData as JSON };
    this.application$ = this.#applicationService.apply(payload);
    this.form().reset();
  }
}

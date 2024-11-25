import { Component, inject, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IApplication, IProgram } from 'app/shared/utils/types/models.type';
import { Observable } from 'rxjs';
import { IAPIResponse } from 'app/shared/services/api/types/api-response.type';
import { CommonModule } from '@angular/common';
import { AlertComponent } from 'app/shared/ui/alert/alert.component';
import { Animations } from 'app/shared/utils/animations';
import { ProgramsService } from '../../../data-access/programs.service';

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
  #programsService = inject(ProgramsService);

  onSubmit(): void {
    this.application$ = this.#programsService.apply({ program: this.program().id, answers: this.formData as JSON });
  }
}

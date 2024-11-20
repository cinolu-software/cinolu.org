import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-program-application',
    imports: [FormsModule, MatInputModule, MatProgressSpinnerModule],
    templateUrl: './application.component.html'
})
export class ApplicationComponent {
  formData: Record<string, string | number | boolean> = {};
  jsonData = input.required<string>();

  generateInputsArray(jsonData: string): { required: true; label: string; name: string; type: string }[] {
    const parsedData = JSON.parse(jsonData);
    return parsedData?.iputs.map((input: unknown) => input) || null;
  }

  onSubmit(): void {
    console.log('Form Submitted:', this.formData);
  }
}

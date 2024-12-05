import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-update-password',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './update-password.component.html'
})
export class UpdatePasswordComponent {
  form: FormGroup;
  #fb = inject(FormBuilder);

  constructor() {
    this.form = this.#fb.nonNullable.group({
      password: ['', Validators.required],
      password_confirm: ['', Validators.required]
    });
  }

  updateInfo(): void {
    console.log(this.form.value);
  }
}

import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { team } from 'app/pages/landing/utils/data/team';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../auth.service';
import { MutationResult } from '@ngneat/query';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations,
  standalone: true,
  imports: [
    FuseAlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
    CommonModule,
    NgOptimizedImage
  ]
})
export class AuthForgotPasswordComponent {
  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  forgotPasswordForm: FormGroup;
  team = team;
  forgotPassword: MutationResult<void, Error, unknown>;

  constructor() {
    this.forgotPasswordForm = this.#formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
    this.forgotPassword = this.#authService.forgotPassword();
  }

  submitForgotPassword(): void {
    if (!this.forgotPasswordForm.invalid) {
      this.forgotPassword.mutate(this.forgotPasswordForm.value);
    }
  }
}

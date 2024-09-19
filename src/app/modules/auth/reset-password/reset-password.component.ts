import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { Observable } from 'rxjs';
import { TopbarComponent } from '../../../core/components/topbar/topbar.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'auth-reset-password',
  templateUrl: './reset-password.component.html',
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
    TopbarComponent,
    CommonModule,
    NgOptimizedImage
  ]
})
export class AuthResetPasswordComponent {
  resetPasswordForm: FormGroup;
  isLoading = false;
  error = null;
  private _formBuilder = inject(FormBuilder);

  constructor() {
    this.resetPasswordForm = this._formBuilder.group({
      token: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required]
    });
  }

  resetPassword(): void {
    if (!this.resetPasswordForm.invalid) {
    }
  }
}

import { Component, inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { team } from 'app/pages/landing/data/team';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from 'app/pages/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'auth-forgot-password',
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
export class AuthForgotPasswordComponent implements OnDestroy {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  error = null;
  success = null;
  team = team;
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  private _subscription: Subscription | null = null;

  constructor() {
    this.forgotPasswordForm = this._formBuilder.group({
      email: ['musanziwilfried@gmail.com', [Validators.required, Validators.email]]
    });
  }

  submitForgotPassword(): void {
    if (!this.forgotPasswordForm.invalid) {
      this.isLoading = true;
      this.error = null;
      this.success = null;
      this.forgotPasswordForm.disable();
      this._subscription = this._authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.forgotPasswordForm.enable();
          this.success = 'Un email vous a été envoyé avec les instructions pour réinitialiser votre mot de passe.';
        },
        error: (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.error = error.error['message'];
          this.forgotPasswordForm.enable();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}

import { Component, inject, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { Observable, Subscription } from 'rxjs';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { team } from 'app/pages/landing/data/team';
import { AuthService } from 'app/pages/auth/auth.service';

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
    CommonModule,
    NgOptimizedImage
  ]
})
export class AuthResetPasswordComponent implements OnDestroy {
  resetPasswordForm: FormGroup;
  isLoading = false;
  error = null;
  team = team;
  private _formBuilder = inject(FormBuilder);
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);
  private _authService = inject(AuthService);
  token = this._activatedRoute.snapshot.queryParams['token'];
  private _subscription: Subscription | null = null;

  constructor() {
    this.resetPasswordForm = this._formBuilder.group({
      password: ['', Validators.required],
      password_confirm: ['', Validators.required]
    });
  }

  resetPassword(): void {
    if (!this.resetPasswordForm.invalid) {
      this.isLoading = true;
      this.error = null;
      this.resetPasswordForm.disable();
      const payload = {
        token: this.token,
        password: this.resetPasswordForm.value.password,
        password_confirm: this.resetPasswordForm.value.password_confirm
      };

      this._subscription = this._authService.resetPassword(payload).subscribe({
        next: () => {
          this.isLoading = false;
          this._router.navigate(['/sign-in']);
        },
        error: (err) => {
          this.isLoading = false;
          this.error = err.error.message;
          this.resetPasswordForm.enable();
        }
      });
    }
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}

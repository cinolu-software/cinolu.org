import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { fuseAnimations } from '@fuse/animations';
import { FuseAlertComponent } from '@fuse/components/alert';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { team } from 'app/pages/landing/data/team';
import { AuthService } from '../../auth.service';
import { MutationResult } from '@ngneat/query';
import { IUser } from '../../../../common/types/models.interface';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
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
export class AuthResetPasswordComponent {
  resetPasswordForm: FormGroup;
  team = team;
  private _token = inject(ActivatedRoute).snapshot.queryParams['token'];
  private _formBuilder = inject(FormBuilder);
  private _authService = inject(AuthService);
  resetPassword: MutationResult<IUser, Error, unknown>;

  constructor() {
    this.resetPasswordForm = this._formBuilder.group({
      password: ['', Validators.required],
      password_confirm: ['', Validators.required]
    });
    this.resetPassword = this._authService.resetPassword();
  }

  onResetPassword(): void {
    if (this.resetPasswordForm.invalid) return;
    this.resetPasswordForm.disable();
    const { password, password_confirm } = this.resetPasswordForm.value;
    const payload = { token: this._token, password, password_confirm };
    this.resetPassword.mutate(payload);
    this.resetPasswordForm.enable();
  }
}

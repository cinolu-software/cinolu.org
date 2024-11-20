import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { Animations } from '@core/animations';
import { AlertComponent } from '@core/components/alert/alert.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core/auth/auth.service';
import { IUser } from 'app/common/types/models.type';
import { AuthCardComponent } from '../../components/auth-card/auth-card.component';
import { TopbarComponent } from '../../../../common/components/topbar/topbar.component';
import { Observable } from 'rxjs';
import { IAPIResponse } from '@core/services/api/types/api-response.type';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  animations: Animations,
  imports: [
    AlertComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    CommonModule,
    AuthCardComponent,
    TopbarComponent
  ]
})
export class AuthResetPasswordComponent {
  #token = inject(ActivatedRoute).snapshot.queryParams['token'];
  #formBuilder = inject(FormBuilder);
  #authService = inject(AuthService);
  resetPasswordForm: FormGroup;
  resetPassword$: Observable<IAPIResponse<IUser>>;

  constructor() {
    this.resetPasswordForm = this.#formBuilder.group({
      password: ['', Validators.required],
      password_confirm: ['', Validators.required]
    });
  }

  onResetPassword(): void {
    if (this.resetPasswordForm.invalid) return;
    this.resetPasswordForm.disable();
    const { password, password_confirm } = this.resetPasswordForm.value;
    const payload = { token: this.#token, password, password_confirm };
    this.resetPassword$ = this.#authService.resetPassword(payload);
    this.resetPasswordForm.enable();
  }
}
